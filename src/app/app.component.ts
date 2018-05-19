import { Component, Input, Output, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _input = '0';
  private _n1;
  private _n2;
  private _currentOperator;
  private _resetInput = true;
  private _addDecimal = false;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    event.preventDefault();

    if (event.keyCode === 8 && !this._resetInput) {
      this.backspace();
    }
  }

  @Input()
  get input() {
    return this._input;
  }

  @Output()
  onBackspaceClick() {
    if (!this._resetInput) {
      this.backspace();
    }
  }

  @Output()
  onAddClick() {
    this.add();
  }

  @Output()
  onSubtractClick() {
    this.subtract();
  }

  @Output()
  onDivideClick() {
    this.divide();
  }

  @Output()
  onMultiplyClick() {
    this.multiply();
  }

  @Output()
  onInverseClick() {
    if (!this._n1) {
      this._n1 = Number.parseFloat(this._input);
    }
    this._input = (1 / this._n1).toString();
    this._n1 = null;
    this._n2 = null;
    this._resetInput = true;
  }

  @Output()
  onNumberClick(e) {
    const input = e.target.textContent;

    if (this._resetInput) {
      if (this._addDecimal) {
        this._input = `0.${input}`;
        this._addDecimal = false;
      } else {
        this._input = input;
      }
      this._resetInput = false;
    } else {
      if (this._addDecimal) {
        this._input = `${this._input}.${input}`;
        this._addDecimal = false;
      } else {
        this._input += input;
      }
    }
  }

  @Output()
  onClearClick() {
    this._input = '0';
    this._n2 = null;
    this._resetInput = true;
  }

  @Output()
  onAllClearClick() {
    this._input = '0';
    this._n1 = null;
    this._n2 = null;
    this._resetInput = true;
  }

  @Output()
  onDecimalClick() {
    const input = Number.parseFloat(this._input);

    if (Math.trunc(input) === input) {
      this._addDecimal = true;
    } else {
      this._addDecimal = false;
    }
  }

  @Output()
  onNegativeClick() {
    this._input = (Number.parseFloat(this._input) * -1).toString();
    this._n1 = null;
    this._n2 = null;
    this._resetInput = true;
  }

  @Output()
  onPercentageClick() {
    this.percentage();
  }

  @Output()
  onSquareRootClick() {
    this.sqrt();
  }

  @Output()
  onEqualClick() {
    switch (this._currentOperator) {
      case 'add':
        this.add();
      break;
      case 'subtract':
        this.subtract();
      break;
      case 'multiply':
        this.multiply();
      break;
      case 'divide':
        this.divide();
      break;
    }

    this._resetInput = true;
  }

  private add() {
    this._currentOperator = 'add';

    if (!this._n1) {
      this._n1 = Number.parseFloat(this._input);
    } else {
      this._n2 = Number.parseFloat(this._input);
      this._input = (this._n1 + this._n2).toString();
      this._n1 = null;
      this._n2 = null;
    }

    this._resetInput = true;
  }

  private subtract() {
    this._currentOperator = 'subtract';

    if (!this._n1) {
      this._n1 = Number.parseFloat(this._input);
    } else {
      this._n2 = Number.parseFloat(this._input);
      this._input = (this._n1 - this._n2).toString();
      this._n1 = null;
      this._n2 = null;
    }

    this._resetInput = true;
  }

  private sqrt() {
    this._input = Math.sqrt(Number.parseFloat(this._input)).toString();
    this._n1 = null;
    this._n2 = null;

    this._resetInput = true;
  }

  private divide() {
    this._currentOperator = 'divide';

    if (!this._n1) {
      this._n1 = Number.parseFloat(this._input);
    } else {
      this._n2 = Number.parseFloat(this._input);
      this._input = (this._n1 / this._n2).toString();
      this._n1 = null;
      this._n2 = null;
    }

    this._resetInput = true;
  }

  private multiply() {
    this._currentOperator = 'multiply';

    if (!this._n1) {
      this._n1 = Number.parseFloat(this._input);
    } else {
      this._n2 = Number.parseFloat(this._input);
      this._input = (this._n1 * this._n2).toString();
      this._n1 = null;
      this._n2 = null;
    }

    this._resetInput = true;
  }

  private percentage() {
    this._input = (Number.parseFloat(this._input) / 100).toString();
    this._n1 = null;
    this._n2 = null;

    this._resetInput = true;
  }

  private backspace() {
    if (this._resetInput) {
      return;
    }
    if (this._input.length > 1) {
      const newLength = this._input.length - 1;
      this._input = this._input.substr(0, newLength);
    } else {
      this._input = '0';
    }
  }
}
