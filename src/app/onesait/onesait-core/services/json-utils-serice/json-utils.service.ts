import { Injectable } from '@angular/core';

import * as _ from 'underscore';

@Injectable()
export class JsonUtilsService {

  constructor() { }

  removeFromDotNotation(obj, attribute) {
    let result = obj;
    try {
      let tokens = attribute.split('.');
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (i === tokens.length - 1) {
          delete result[token];
        } else {
          result = result[token];
        }
      }
    } catch (e) {

    }
  }
  getValueFromDotNotation(json, attribute) {
    let result;
    try {
      let tokens = attribute.split('.');
      let obj = json;
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (i === tokens.length - 1) {
          result = obj[token];
        } else {
          obj = obj[token];
        }
      }
    } catch (e) {
      return null;
    }
    return result;
  }
  getValueFromDotArrayNotation(json, attribute) {
    // TODO Refactorizar
    let result;
    try {
      let tokens = attribute.split('.');
      let obj = json;
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];

        let firstPos = token.indexOf('[');
        let secondPos = token.indexOf(']');
        if (firstPos !== -1 && secondPos !== -1) {

          let arrayPosition = token.substring(firstPos + 1, secondPos);
          let tokenArray = token.replace('[' + arrayPosition + ']', '');

          if (i === tokens.length - 1) {
            let position = parseInt(arrayPosition, 10);
            result = obj[tokenArray][position];
          } else {
            let position = parseInt(arrayPosition, 10);
            obj = obj[tokenArray][position];
          }

        } else {
          if (i === tokens.length - 1) {
            result = obj[token];
          } else {
            obj = obj[token];
          }
        }


      }
    } catch (e) {
      return null;
    }
    return result;
  }
  jsonContainsJson(json1, json2) {
    let me = this;
    if (json1 && json2) {
      let result = true;
      for (let property in json2) {
        if (_.isObject(json2[property])) {
          if (!me.jsonContainsJson(json1[property], json2[property])) {
            return false;
          }
        } else {
          if (json1[property] !== json2[property]) {
            return false;
          }
        }
      }
      return result;
    }
    return false;
  }
  replaceJSONObjectFromDotNotation(json, attributes) {
    for (let property in attributes) {
      let tokens = property.split('.');
      let obj = json;
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (i === tokens.length - 1) {
          obj[token] = attributes[property];
        } else {
          obj = obj[token];
        }
      }
    }
  }
  createJSONObjectFromDotNotation(json) {
    if (json) {
      for (let property in json) {
        if (property.indexOf('.') >= 0) {
          let tokens = property.split('.');
          let temp = json;
          for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if (i === tokens.length - 1) {
              temp[token] = json[property];
              delete json[property];
            } else {
              if (!temp[token]) {
                temp[token] = {};
              }
              temp = temp[token];
            }
          }
        }
      }
    }
    return json;
  }
  copyJSONProperties(json, json2) {
    let me = this;
    if (json && json2) {
      if (_.isObject(json2) && !_.isArray(json2) && !_.isFunction(json2)) {
        for (let property in json2) {
          if (json[property]) {
            if (_.isObject(json2[property]) && !_.isArray(json2[property]) && !_.isFunction(json2[property])) {
              me.copyJSONProperties(json[property], json2[property]);
            } else {
              json[property] = json2[property];
            }
          } else {
            json[property] = json2[property];
          }
        }
      } else {
        json = json2;
      }

    }
  }

  overwriteJSONAttributes(json, json2) {
    if (json && json2) {
      if (_.isObject(json2) && !_.isArray(json2) && !_.isFunction(json2)) {
        for (let property in json2) {
          if (json[property] && _.isObject(json2[property])) {
            this.overwriteJSONAttributes(json[property], json2[property]);
          } else {
            json[property] = json2[property];
          }
        }
      }
    }
  }

}
