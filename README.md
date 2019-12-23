# AutoUpdate
AutoUpdate module for use with Drupi. Download Drupi at https://stacket.net/drupi

The current latest version of AutoUpdate is **1.0**, and this documentation will always be in reference to the latest version of AutoUpdate.

# What's AutoUpdate?
AutoUpdate is a Drupi module that automatically keeps all of your Drupi modules up-to-date. Stop manually checking for updates for your favorite modules, let AutoUpdate do the hard work for you!

# Install Guide
Firstly, make sure that `Drupi` is installed on your server. If it isn't, you can download it from https://stacket.net/drupi. Once Drupi is installed, restart your server and execute the command `/drupi install AutoUpdate`. You can now use AutoUpdate!

# How to use AutoUpdate
AutoUpdate only does one thing: update your modules. However, you have control over when this happens. All you need to do is insert `require("AutoUpdate")()` in your code, whenever you want it to run.

Example use:

```js
// Check for updates before loading
require("AutoUpdate")();

const TaskUtils = require("TaskUtils");
// ...
```
