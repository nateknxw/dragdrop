let currentId =0; 
export class ComponentBase {

    constructor(top,left, name){
        this.top = top;
        this.left = left;
        this.title = name;
        this.prevId = ++currentId;
        this.nextId = ++currentId;
        this.prev = [];
        this.next = [];
    }


}

export class Battery extends ComponentBase {
    constructor(top, left, voltage){
        super(top, left, "Battery");
        this.voltage = voltage;
    }
}

export class Resistor extends ComponentBase{
    constructor(top,left, resistance){
        super(top, left, "Resistor");
        this.resistance = resistance;
    }
}

export class Lightbulb extends Resistor {
    constructor(top, left, resistance){
        super(top, left, resistance);
        this.title   = "Lightbulb"; 
    }
}