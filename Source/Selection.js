// ********************************
// # Selection.js
// # Sketch Javascript API.
//
// All code (C) 2016 Bohemian Coding.
// ********************************

import { WrappedObject } from './WrappedObject.js'
import { Layer } from './Layer.js'


/**
    Represents the layers that the user has selected.
*/

export class Selection extends WrappedObject {

    /**
      Make a new Selection object.

      @param {Document} document The document that the selection relates to.
    */

    constructor(document) {
      super(document)
    }

    /**
        Does the selection contain any layers?

        @return {boolean} true if the selection is empty.
    */

    get isEmpty() {
        return (this._object.selectedLayers().count() == 0);
    }

    /**
        Perform an action once for each layer in the selection, then clear it.

        @param {function(layer: Layer)} block The function to execute for each layer.
    */

    iterateAndClear(block) {
      var layers = this._object.selectedLayers();
      this.clear();
      this._iterateWithLayers(layers, block);
    }

    /**
        Perform an action once for each layer in the selection.

        @param {function(layer: Layer)} block The function to execute for each layer.
    */

    iterate(block) {
      var layers = this._object.selectedLayers();
      this._iterateWithLayers(layers, block);
    }

    /**
        Clear the selection.
    */

    clear() {
      this._object.currentPage().deselectAllLayers();
    }


    /**
        Iterate through a bunch of layers, executing a block.

        @param {array} layers The layers to iterate over.
        @param {function(layer: Layer)} block The function to execute for each layer.
    */

    _iterateWithLayers(layers, block) {
      var loop = layers.objectEnumerator();
      var item;
      while (item = loop.nextObject()) {
        block(new Layer(item));
      }
    }

    /**
     Return a list of tests to run for this class.

     @return {dictionary} A dictionary containing the tests to run. Each key is the name of a test, each value is a function which takes a Tester instance.
     */

    static tests() {
        return {
            "tests" : {
                "test something" : function(tester) {
                    tester.assert(true);
                },
            }
        };
    }

}