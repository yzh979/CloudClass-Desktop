const path = require('path');
const { exec } = require('child_process');
const rimraf = require('rimraf');
const { mkdir, writeFile, readFile } = require('fs/promises');
const cpx = require('cpx');

const spawn = (cmd) => {
  console.log('spwan', cmd);
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      console.log('spawn', stdout, stderr);
      err && reject(err);
      console.log(stdout || stderr);
      resolve(stdout || stderr);
    });
  });
};

const folderPath = path.join(__dirname);
const prefix = path.join(__dirname, 'packages');

const rm = (path) => {
  return new Promise((resolve, reject) => {
    rimraf(path, resolve);
  });
};

const cp = (src, dst, options) => {
  return new Promise((resolve, reject) => {
    cpx.copy(src, dst, options, resolve);
  });
};

const cpFile = async (src, dst) => {
  const data = await readFile(src, { encoding: 'utf-8' });
  await writeFile(dst, data, { encoding: 'utf-8' });
};

const run = async () => {
  await rm(path.join(__dirname, '.tmp'));
  await mkdir(path.join(__dirname, '.tmp'));

  await cp(`${prefix}/agora-rte-sdk/lib/**/*`, `${folderPath}/.tmp/agora-rte-sdk/lib`);
  await cp(`${prefix}/agora-edu-core/lib/**/*`, `${folderPath}/.tmp/agora-edu-core/lib`);
  await cp(`${prefix}/agora-classroom-sdk/lib/**/*`, `${folderPath}/.tmp/agora-classroom-sdk/lib`);
  await cpFile(`${prefix}/agora-rte-sdk/package.lib.json`, `.tmp/agora-rte-sdk/package.json`);
  await cpFile(`${prefix}/agora-edu-core/package.lib.json`, `.tmp/agora-edu-core/package.json`);
  await cpFile(
    `${prefix}/agora-classroom-sdk/package.lib.json`,
    `.tmp/agora-classroom-sdk/package.json`,
  );
};

run();
