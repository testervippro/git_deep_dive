import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hookPath = path.join(__dirname, '.git', 'hooks', 'pre-commit');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

const createHook = () => {
  const hookContent = `#!/bin/sh

# -----------------------------------------------
# Get all JS/TS staged files
# -----------------------------------------------
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(js|ts|jsx|tsx)$')

if [ "$STAGED_FILES" = "" ]; then
  exit 0
fi

# -----------------------------------------------
# Check console.log
# -----------------------------------------------
FOUND_CONSOLE=0
echo "Checking for console.log in staged files..."
for FILE in $STAGED_FILES; do
  if grep -n "console\\\\.log" "$FILE" > /dev/null; then
    echo "❌ Found console.log in $FILE"
    FOUND_CONSOLE=1
  fi
done
if [ $FOUND_CONSOLE -eq 1 ]; then
  echo "Commit aborted! Please remove all console.log statements."
  exit 1
fi

# -----------------------------------------------
# Check ESLint (strict, no auto-fix)
# -----------------------------------------------
echo "Running ESLint (strict check)..."
npx eslint $STAGED_FILES
if [ $? -ne 0 ]; then
  echo "❌ ESLint found errors. Commit aborted."
  exit 1
fi

echo "✅ All checks passed. Commit can proceed."
exit 0
`;

  fs.writeFileSync(hookPath, hookContent, { mode: 0o755 });
  console.log('✅ pre-commit hook created at .git/hooks/pre-commit');
};

const initHook = async () => {
  if (fs.existsSync(hookPath)) {
    const answer = await question('Pre-commit hook already exists. Remove and create a new one? (y/n) ');
    if (answer.toLowerCase() === 'y') {
      fs.unlinkSync(hookPath);
      console.log('Old pre-commit hook removed.');
      createHook();
    } else {
      console.log('Pre-commit hook creation canceled.');
    }
  } else {
    createHook();
  }
  rl.close();
};

initHook();
