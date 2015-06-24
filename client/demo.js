Template.demo.helpers({
  people: function() {
    return People.find();
  }
});

var DOT_SIZE = 150;
var MAX_COLS = 7;

DemoLayout = function(rows, cols, Elements) {
  famous.core.Node.call(this);

  this
    .setMountPoint(0.5, 0.5, 0.5)
    .setAlign(0.5, 0.5, 0.5)
    .setOrigin(0.5, 0, 0)
    .setPosition(0, 0);

  this.layout = new Layout(this);
  var clock = famous.core.FamousEngine.getClock();

  var handle = clock.setInterval(function() {
    this.layout.next();
  }.bind(this), 2000);

  var orig = this.onDismount;
  this.onDismount = function() {
    clock.clearTimer(handle);
    orig.apply(this, arguments);
  }
}
DemoLayout.prototype = Object.create(famous.core.Node.prototype);
DemoLayout.prototype.constructor = DemoLayout;

DemoNode = function(step, element) {
  famous.core.Node.call(this);

  this
    .setMountPoint(0.5, 0.5, 10)
    .setAlign(0.5, 0.5, 0.5)
    .setSizeMode('absolute', 'absolute', 'absolute')
    .setAbsoluteSize(DOT_SIZE, DOT_SIZE, DOT_SIZE);

  this.position = new famous.components.Position(this);
}
DemoNode.prototype = Object.create(famous.core.Node.prototype);
DemoNode.prototype.constructor = DemoNode;

var Curves = famous.transitions.Curves;
Layout = function(node) {
    this.node = node;
    this.id = this.node.addComponent(this);
    this.current = 0;
    // DemoNode layout -> Square layout -> Square layout with random Z
    // -> Expanded square -> Square layout
    this.spacing = [ +DOT_SIZE, -DOT_SIZE*3, 0, 20, 0 ];
    this.randomizePositionZ = [ false, false, true, false, true ];
    this.curve = [ Curves.outQuint, Curves.outElastic, Curves.inElastic, Curves.inOutEase, Curves.inBounce ];
    this.duration = [ 700, 3000, 3000, 1000, 700 ];

    // Transitions to initial state.
    this.next();
}

Layout.prototype.next = function next() {
  if (this.current++ === 4) this.current = 0;

  var spacing = this.spacing[this.current];
  var randomizePositionZ = this.randomizePositionZ[this.current];
  var duration = this.duration[this.current];
  var curve = this.curve[this.current];

  var row = 0;
  var col = 0;
  var dimension = (spacing + DOT_SIZE);
  var bounds = [-(((dimension) * MAX_COLS / 2) - (dimension / 2)), -(((dimension) * MAX_COLS / 2) - (dimension / 2))];
  var children = this.node.getChildren();
  for (var i = 0; i < children.length; i++) {
    var polarity = Math.random() < 0.5 ? -1 : 1;
    var x = bounds[0] + ((dimension) * col++);
    var y = bounds[1] + ((dimension) * row);
    var z = (randomizePositionZ) ? Math.floor(Math.random() * 80) * polarity : 0;
    children[i].position.set(x, y, z, {
        duration: i*10 + duration,
        curve: curve
    });
    if (col >= MAX_COLS) {
        col = 0;
        row++;
    }
  }
};

FView.wrap('DemoLayout', DemoLayout);
FView.wrap('DemoNode', DemoNode);
