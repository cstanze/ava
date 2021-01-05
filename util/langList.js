/**
  * Quick Docs
  * ==========
  * Command type exec:
  *   run:
  *     type - String
  *     input - <code> for the code to run. <ext> for the language's extension
  *     comments - Simple command to run.
  * Command type func:
  *   run:
  *     type - Function
  *     input - A simple object with the code (arg.code), extension (arg.ext), and nodejs fs module (args.fs)
  *     returns - 1 for complete, 0 for fixable error, -1 for fatal (rare).
  *     comments - Runs the JS function upon code execution
  */

// TODO: Add more langs
module.exports = {
  py: {
    extension: 'py',
    command: {
      type: 'exec',
      run: `python3 -c '<code>'`
    }
  }
}
