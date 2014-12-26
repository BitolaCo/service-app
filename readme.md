## Overview

The app works offline, and should be completely functional.
Clearing the browser's cache will also clear your data. Be careful!

### Unchanging Files

At the end of the `build` process, all files from the `src/assets` 
directory are copied directly into the `app` folder without 
being processed.

This is useful for files like `favico.ico`, `manifest.webapp`, etc.

## Known Issues

- Adding new css, less, or sass files require restarting the `gulp watch` task.