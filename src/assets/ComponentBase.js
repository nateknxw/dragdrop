let currentId =0; 
class ComponentBase {

    constructor(top,left, name){
        this.top = top;
        this.left = left;
        this.name = name;
        this.prevId = ++currentId;
        this.nextId = ++currentId;
        this.prev = [];
        this.next = [];
    }


}

class Battery extends ComponentBase {
    constructor(top, left, voltage){
        this.super(top, left, "Battery");
        this.voltage = voltage;
    }
}

class Resistor extends ComponentBase{
    constructor(top,left, resistance){
        this.super(top, left, "Resistor");
        this.resistance = resistance;
    }
}

class Lightbulb extends Resistor {
    constructor(top, left, resistance){
        this.super(top, left, resistance);
        this.name = "Lightbulb"; 
    }
}