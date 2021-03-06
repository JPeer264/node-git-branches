import fs from 'fs';
import { homedir } from 'os';
import test from 'ava';
import path from 'path';

import gitBranches from './index';

const fixtures = path.join(process.cwd(), 'test', 'fixtures');

const folders = [
  'feat_test',
  'master',
];

test.before('rename git folders', () => {
  folders.map(folder => fs.renameSync(path.join(fixtures, folder, 'git'), path.join(fixtures, folder, '.git')));
});

test.after.always('rename .git folders', () => {
  folders.map(folder => fs.renameSync(path.join(fixtures, folder, '.git'), path.join(fixtures, folder, 'git')));
});

test('check if the given directory is the branch master', (t) => {
  t.is(gitBranches(path.join(fixtures, 'master')), 'master');
});

test('check if the given directory is the branch feat/test', (t) => {
  t.is(gitBranches(path.join(fixtures, 'feat_test')), 'feat_test');
});

test('check the branch name of the home dir', (t) => {
  t.false(gitBranches(homedir()));
});
