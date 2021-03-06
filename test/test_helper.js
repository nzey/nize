/* eslint-disable func-names */
import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import TestUtils from 'react-dom/test-utils';
import { JSDOM } from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { factory } from 'factory-girl';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import rootReducers from '../src/app/reducers/index';
import path from 'path';

// Load factories (https://github.com/aexmachina/factory-girl)

// TODO: Maybe use glob or require-dir pckg instead
// (https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder)
const normalizedPath = path.join(__dirname, 'factories');
require('fs').readdirSync(normalizedPath).forEach(file => {
  require(path.join(normalizedPath, file));
});

// React componenent test setup

global.window = new JSDOM(
  '<!doctype html><html><body></body></html>',
  { 
    userAgent: 'node.js',
    runScripts: "dangerously" 
  }).window;

window.localStorage = {}
global.document = window.document

const $ = _$(window);

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={applyMiddleware(thunk)(createStore)(rootReducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function (eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    (props) => <DecoratedComponent {...props} />
  );
}

export { renderComponent, expect, factory, wrapInTestContext };
