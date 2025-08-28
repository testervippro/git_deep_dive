const fs = require('fs');
const path = require('path');
const readline = require('readline');

const hookPath = path.join('.git', 'hooks', 'pre-commit');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createHook() {
  const hookContent = `#!/bin/sh

# -----------------------------------------------
# Get all  file JS/TS staged
# -----------------------------------------------
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(js|ts|jsx|tsx)$')

if [ "$STAGED_FILES" = "" ]; then
  exit 0
fi

# -----------------------------------------------
#  Check console.log
# -----------------------------------------------
FOUND_CONSOLE=0
echo "Checking for console.log in staged files..."
for FILE in $STAGED_FILES; do
  if grep -n "console\\.log" "$FILE" > /dev/null; then
    echo " Found console.log in $FILE"
    FOUND_CONSOLE=1
  fi
done
if [ $FOUND_CONSOLE -eq 1 ]; then
  echo "Commit aborted! Please remove all console.log statements."
  exit 1
fi


# -----------------------------------------------
#  Check ESLint (no auto-fix)
# -----------------------------------------------
echo "Running ESLint (check only)..."
for FILE in $STAGED_FILES; do
  npx eslint "$FILE"
done
if [ $? -ne 0 ]; then
  echo " ESLint found errors. Commit aborted."
  exit 1
fi

echo " All checks passed. Commit can proceed."
exit 0
`;

  fs.writeFileSync(hookPath, hookContent, { mode: 0o755 });
  console.log(' pre-commit hook created at .git/hooks/pre-commit');
}

if (fs.existsSync(hookPath)) {
  rl.question('Pre-commit hook already exists. Do you want to remove it and create a new one? (y/n) ', answer => {
    if (answer.toLowerCase() === 'y') {
      fs.unlinkSync(hookPath);
      console.log('Old pre-commit hook removed.');
      createHook();
    } else {
      console.log('Pre-commit hook creation canceled.');
    }
    rl.close();
  });
} else {
  createHook();
  rl.close();
}
