(function(global) {
  "use strict";

  var halfPi = Math.PI / 2;

  var ease = {
    in: identity,
    out: reverse,
    inOut: reflect,
    outIn: reverseReflect,
    linear: linearIn,
    linearIn: linearIn,
    linearOut: linearIn,
    linearInOut: linearIn,
    linearOutIn: linearIn,
    quad: quadIn,
    quadIn: quadIn,
    quadOut: quadOut,
    quadInOut: quadInOut,
    quadOutIn: quadOutIn,
    cubic: cubicIn,
    cubicIn: cubicIn,
    cubicOut: cubicOut,
    cubicInOut: cubicInOut,
    cubicOutIn: cubicOutIn
  };

  function identity(f) {
    return f;
  }

  function reverse(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }

  function reflect(f) {
    return function(t) {
      return t *= 2, (t <= 1 ? f(t) : 2 - f(2 - t)) / 2;
    };
  }

  function reverseReflect(f) {
    return function(t) {
      return t *= 2, (t <= 1 ? 1 - f(1 - t) : 1 + f(t - 1)) / 2;
    };
  }

  function linearIn(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : t;
  }

  function quadIn(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : t * t;
  }

  function quadOut(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : 2 * t - t * t;
  }

  function quadInOut(t) {
    return t <= 0 ? 0
        : t <= .5 ? 2 * t * t
        : t >= 1 ? 1
        : 4 * t - 2 * t * t - 1;
  }

  function quadOutIn(t) {
    return t <= 0 ? 0
        : t <= .5 ? 2 * t - 2 * t * t
        : t >= 1 ? 1
        : 1 - 2 * t + 2 * t * t;
  }

  function cubicIn(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : t * t * t;
  }

  function cubicOut(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : 3 * t - 3 * t * t + t * t * t;
  }

  function cubicInOut(t) {
    return t <= 0 ? 0
        : t <= .5 ? 4 * t * t * t
        : t >= 1 ? 1
        : 12 * t - 12 * t * t + 4 * t * t * t - 3;
  }

  function cubicOutIn(t) {
    return t <= 0 ? 0
        : t <= .5 ? 3 * t - 6 * t * t + 4 * t * t * t
        : t >= 1 ? 1
        : 3 * t - 6 * t * t + 4 * t * t * t;
  }

  function sinIn(t) {
    return t <= 0 ? 0
        : t >= 1 ? 1
        : 1 - Math.cos(t * halfPi);
  }

  function Transition(root, depth) {
    if (!(this instanceof Transition)) throw new Error("not yet implemented"); // TODO?
    this._root = root;
    this._depth = depth;
  }

  var selection_transition = function() {
    return new Transition(this._root, this._depth);
  };

  var index_js = {
    get ease () { return ease; },
    get transition () { return Transition; }
  };

  d3.selection.prototype.transition = selection_transition;

  var object = global;
  object = object.d3 || (object.d3 = {});
  for (var name in index_js) object[name] = index_js[name];
  if (typeof define === "function" && define.amd) define(d3);
  else if (typeof module === "object" && module.exports) module.exports = d3;
})(typeof global === "undefined" ? this : global);
