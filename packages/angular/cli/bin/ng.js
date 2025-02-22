#!/usr/bin/env node
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/* eslint-disable no-console */
/* eslint-disable import/no-unassigned-import */
'use strict';

// Provide a title to the process in `ps`.
// Due to an obscure Mac bug, do not start this title with any symbol.
try {
  process.title = 'ng ' + Array.from(process.argv).slice(2).join(' ');
} catch (_) {
  // If an error happened above, use the most basic title.
  process.title = 'ng';
}

// This node version check ensures that extremely old versions of node are not used.
// These may not support ES2015 features such as const/let/async/await/etc.
// These would then crash with a hard to diagnose error message.
var version = process.versions.node.split('.').map((part) => Number(part));
if (version[0] % 2 === 1 && version[0] > 14) {
  // Allow new odd numbered releases with a warning (currently v15+)
  console.warn(
    'Node.js version ' +
      process.version +
      ' detected.\n' +
      'Odd numbered Node.js versions will not enter LTS status and should not be used for production.' +
      ' For more information, please see https://nodejs.org/en/about/releases/.',
  );

  require('./bootstrap');
} else if (
  version[0] < 12 ||
  version[0] === 13 ||
  (version[0] === 12 && version[1] < 20) ||
  (version[0] === 14 && version[1] < 15)
) {
  // Error and exit if less than 12.20 or 13.x or less than 14.15
  console.error(
    'Node.js version ' +
      process.version +
      ' detected.\n' +
      'The Angular CLI requires a minimum Node.js version of either v12.20 or v14.15.\n\n' +
      'Please update your Node.js version or visit https://nodejs.org/ for additional instructions.\n',
  );

  process.exitCode = 3;
} else {
  require('./bootstrap');
}
