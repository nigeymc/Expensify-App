### Links for Completed App

[http://indecision.mead.io](http://indecision.mead.io)

[http://links.mead.io/indecision](http://links.mead.io/indecision)

----------------

###Install

* Install NPM
* then install Yarn
* then use Yarn to install Live server
* Use Babel to compile JSX in to ES5

To install Babel - 

`yarn global add babel-cli@6.24.1`

then 

`yarn init` and run through the questions with the defaults.

then install the babel preset dependencies

`yarn add babel-preset-react@6.24.1 babel-preset-env@1.5.2`

To run Babel in the CLI -

`babel src/app.js --out-file=public/scripts/app.js --presets="env,react"`

then have babel watch the src files - 

`babel src/app.js --out-file=public/scripts/app.js --presets="env,react" --watch`


Then run LiverServer concurrently - `live-server public`

------------- 

### Classes and constructors

Create the class and use the constructor inside it to set the properties of it, so that it can be reused. Properties can have defaults like the age in example below. A class can be extended as in example below. Use 'Super' to reuse the parent class' properties.

Eg.

```
class Person {
    constructor(name, age = 0, location) {
        this.name = name;
        this.age = age;
        this.location = location;
    }
    
    getDescription() {
        return `${this.name} is ${this.age} years(s) old and lives in ${this.location}!`;
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }

    hasMajor() {
        return !!this.major;
    }

    getDescription() {
        let description = super.getDescription();

        if (this.hasMajor()) {
            description += ` Their major is ${this.major}.`;
        }

        return description;
    }
}

const me = new Person('Niall', 20, 'London');
console.log(me.getDescription());

## console returns
Person {name: "Niall", age: 20, location: "London"}
name: "Niall"
age: 20
location: "London"

```
---------------------------
### React Components

A react component is just an ES6 class. To add all the special behaviour of React, you need to extend the ES6 class.

``` 
class Header extends React.Component {

} 
```

Because a React component is just an ES6 class you extend it using the component name 'React.Component'. React Components require one method to be defined, whereas ES6 classes don't require a method to be defined. The React method is a special method specific to React. It's called `render()` and it returns some JSX.

```
class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Indecision</h1>
                <h2>Put your life in the hands of a computer</h2>
            </div>
        );
    }
}

const jsx = (
    <div>
        <Header />
    </div>
);

ReactDOM.render(jsx, document.getElementById('app'));
```
Render it to the screen using the normal React method - `ReactDom.render();`

### Adding props to a component
Example of adding props to a component inside a nested component.

```
class IndecisionApp extends React.Component {
    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        const options = ['Thing one', 'Thing two', 'Thing four'];


        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action />
                <Options options={options}/>
                <AddOption />
            </div>
        );
    }
}


class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

class Action extends React.Component {
    handlePick() {
        alert('handlePick');
    }
    render() {
        return (
            <div>
                <button onClick={this.handlePick}>What should I do?</button>
            </div>
        );
    }
}

class Options extends React.Component {
    handleRemoveAll() {
        alert('Remove all');
    }
    render() {
        return (
            <div>
                <button onClick={this.handleRemoveAll}>Remove All</button>
                {
                    this.props.options.map((option) => {
                        return <Option key={option} optionText={option} />;
                    })
                }
               
            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
        <div>
             {this.props.optionText}
        </div>
       
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
```

### Events and Method binding

Use bind to set the context of this. If this has been lost and is returning `undefined` .

### setting State in React
State is just an object of key/value pairs. The state object can be changed by an event.

1. Setup default state object
2. Component rendered with default state values*
3. Change state based on event
4. Component re-rendered using new state values*
5. Start again at 3.

### Counter example for how set state

Inside the updater function used to setState we have access to the current state values by using prevState function argument. (Commonly called this, but technically could be called anything as it's a func arg).

```
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        //Set the initial value
        this.state = {
            count: 0
        };
    }

	 // Use prevState 
    handleAddOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count +1
            }
        });
    }

    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count -1
            }
        });
    }

    handleReset() {
        this.setState(() => {
            return {
                count: 0
            }
        });
    }
    
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
```

### Props vs State
**Props**

_Similarities_

* An object
* Can be used when rendering
* changes (from above) cause re-renders

_Differences_

* Comes from above
* Can't be changed by component itself

**State**

_Similarities_

* An object
* Can be used when rendering
* Changes cause re-renders

_Differences_

* Defined in component itself
* Can be changed by component itself

### Stateless function components
Components with out a state. Though they do have props. These are components for presentational purposes. They aren't written as a class. They are written as arrow functions. Because they are not classes, you can not use `this` to reference props. Eg.

```
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

// render it inside the render method in the class

render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';

    return (
        <div>
            <Header title={title} subtitle={subtitle} />
            <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
            <Options options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            />
            <AddOption handleAddOption={this.handleAddOption}/>
        </div>
    );
}
```

### Condense the `setState` to implicitly return an Object

Condense the `setState` to implicitly return an Object:

```
handleDeleteOptions() {
    this.setState(()=> {
        return {
            options: []
        };
    });    
}
```
to:

```
handleDeleteOptions() {
	this.setState(() => ({ options: [] }));
}
```

### Lifecycle Methods

Lifecycle methods are only available in class based components.There is no way to manage lifecycle in stateless functional components.

```
componentDidMount() {
	console.log('componentDidMount');
	}
	
componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
        this.state
        this.props
    }
    
 componentWillUnmount() {
        console.log('componentWillUnmount');
    }
```
We have access to state and props inside `componentDidUpdate`. As well as arguments. 

`componentWillUnmount` will fire just before a component disappears.

### Webpack

Webpack breaks up all of the files in our app in to their own little islands. These can then communicate using ES6 import/export syntax. 
It's better to install local modules rather than global modules in your project.

To add webpack to the project 

* `yarn add webpack@3.1.0`

Setting up the webpack config file - webpack.config.js you'll need to create this file yourself.

``` 
const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  }
}; 
```

Install local modules and your package.json will look like this

```
{
  "name": "indecision-app",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
  "dependencies": {
    "babel-cli": "6.24.1",
    "babel-preset-env": "1.5.2",
    "babel-preset-react": "6.24.1",
    "live-server": "^1.2.1",
    "webpack": "3.1.0"
  }
}
```
Example of exporting/importing another file or methods from another file, in a file called utils.js. This includes named and default exports - 

``` 
console.log("utils is running");

export { square, add, subtract as default };

const square = x => x * x;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

```
The default is subtract and must be referenced in the file like below

```
// import "./utils.js";
import subtract, { square, add } from "./utils.js";

console.log("*****app is running!!");
console.log(square(4));
console.log(add(100, 23));
console.log(subtract(100, 81));

```

Importing npm modules, like React and React dom

`yarn add react@16.0.0 react-dom@16.0.0`

Add a module and rules to the `webpack.config.js` like so -

``` 
const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
```
This above tells webpack to only run `.js` files through babel and to exclude all node (npm) modules/packages.

The dependancies in `package.json` will then look like this -

```
{
  "name": "indecision-app",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
  "dependencies": {
    "babel-cli": "6.24.1",
    "babel-core": "6.25.0",
    "babel-loader": "7.1.1",
    "babel-preset-env": "1.5.2",
    "babel-preset-react": "6.24.1",
    "live-server": "^1.2.1",
    "react": "16.0.0",
    "react-dom": "16.0.0",
    "validator": "^13.0.0",
    "webpack": "3.1.0"
  }
}
```

The `app.js` file becomes a small file for bootstrapping the project only. It will look like the below, with the render method and the imported files needed.

```
import React from "react";
import ReactDOM from "react-dom";
import IndecisionApp from "./components/IndecisionApp";

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));
```
`IndecisionApp.js` then becomes a component itself, but essentially a parent component. It will import all of the smaller components. It will look like the below. 

```
import React from "react";
import AddOption from "./AddOption";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";

export default class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: []
    };
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }
  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  handleAddOption(option) {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }

    this.setState(prevState => ({
      options: prevState.options.concat(option)
    }));
  }
  render() {
    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};
```

Add a devtool to the webpack config to help with debugging, so that when console logging errors it tells you were the file is located in your project and not the transpiled code.

[https://webpack.js.org/configuration/devtool/#devtool]()

`yarn run dev-server`

```
const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  devtool: "cheap-module-eval-source-map"
};
```
ES6 Class Properties
npm module `yarn add babel-plugin-transform-class-properties@6.24.1` install with yarn command.

Lets us customise how we use classes inside our application. We are now able to set up the state outside of constructor functions. We are also able to set those class properties to arrow functions, which is useful event handlers.

Eg.

```
class OldSyntax {
	constructor() {
		this.name = 'Mike';
		this.getGreeting = this.getGreeting.bind(this);
	}
	getGreeting() {
		return `Hi. My name is ${this.name}.`;
	}
}
const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting;
console.log(getGreeting());
```
Storing getGreeting in a variable then trying to reference it with `this` would break and return an error, as this is no longer bound to the instance of the class.

Using the new Syntax from the Class Properties module, then there's no need for a constructor. We can maintain the binding by using a arrow function.

```
class NewSyntax {
	name = 'Jen';
	getGreeting = () => {
		return `Hi. My name is ${this.name}.`;
	}
}
const newSyntax = new NewSyntax();
const newGetGreeting = newSyntax.getGreeting;
consol.log(newGetGreeting());
```
Example of swapping over `handleAddOption` event handler in the `AddOption.js` component.

```
handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = "";
    }
  };
```
becomes... a class property, using the class property to handle state.

```  
handleAddOption = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = "";
    }
  };
  
```

Setting Up a React Modal

Create a new modal component with a button for closing the modal. Pass props to the button.

```
import React from "react";
import Modal from "react-modal";

const OptionModal = props => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    onRequestClose={props.handleClearSelectedOption}
  >
    <h3>Selected Option</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button onClick={props.handleClearSelectedOption}>Okay</button>
  </Modal>
);

export default OptionModal;
```
In the `IndecisionApp.js` add a new state handler

```
handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };
```
Then add the component itself to `IndecisionApp.js`

```
<OptionModal
  selectedOption={this.state.selectedOption}
  handleClearSelectedOption={this.handleClearSelectedOption}
/>
```  
      
### React Router

Expense management app

[https://budget-app.mead.io](https://budget-app.mead.io)

[http://links.mead.io/budget-app](http://links.mead.io/budget-app)

React Router routes the pages in your app. Each route is a page.

Install Reacter Router from github page [https://reacttraining.com/react-router/](https://reacttraining.com/react-router/)

Then in app.js 

`import { BrowserRouter, Route } from "react-router-dom";`

and

```
const routes = (
  <BrowserRouter>
    <div>
      <Route path="/" component={ExpenseDashboardPage} exact={true} />
      <Route path="/create" component={AddExpensePage} />
    </div>
  </BrowserRouter>
);

```
`exact={true}` will mean that only the exact path will render, so that the router doesn't mistake the '\' in the url every time.

Make a change to the web config json: Adding the `historyApiFallback` 

``` 
devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
  } 
```

Tells the `dev server` to always serve up the `index.html` for all unknown 404s

Use `Switch` to go through each route, and find any that is undefined. 

So for a 'Not Found Page or 404' like the following, no path is needed as `Switch` will find it ...

```
const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={ExpenseDashboardPage} exact={true} />
      <Route path="/create" component={AddExpensePage} />
      <Route path="/edit" component={EditExpensePage} />
      <Route path="/help" component={HelpPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);
```

Don't forget to import it in to the app -

`import { BrowserRouter, Route, Switch } from "react-router-dom";`

 **Linking Between Routes/Pages**
 
 Using Link and NavLink for routing.
 
 import both first...
 
 `import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom"; `
 
Example 

```
 const NotFoundPage = () => (
  <div>
    404! <Link to="/">Go home</Link>
  </div>
); 

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <NavLink to="/edit" activeClassName="is-active">
      Edit
    </NavLink>
    <NavLink to="/help" activeClassName="is-active">
      Help
    </NavLink>
  </header>
);
```

In reality we break all of the components out in to their own component files so that the AppRouter.js is a component of it's own but lives in a separate routers directory. The final AppRouter.js file would look like 

```
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
```

## Redux

Redux is a state container, which is exactly what our class based coponents are.

Install redux with `yarn add redux`

`createStore`

Creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.

``` 
import { createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  return state;
});

console.log(store.getState()); 

```
This is a reducer, a function with (state, action) => state signature.
- It describes how an action transforms the state into the next state.
- The shape of the state is up to you: it can be a primitive, an array, an object,
- or even an Immutable.js data structure. The only important part is that you should
- not mutate the state object, but return a new object if the state changes.

Instead of mutating the state directly, you specify the mutations you want to happen with plain objects called actions. Then you write a special function called a reducer to decide how every action transforms the entire application's state.

In a typical Redux app, there is just a single store with a single root reducing function. As your app grows, you split the root reducer into smaller reducers independently operating on the different parts of the state tree. This is exactly like how there is just one root component in a React app, but it is composed out of many small components.

This architecture might seem like an overkill for a counter app, but the beauty of this pattern is how well it scales to large and complex apps. It also enables very powerful developer tools, because it is possible to trace every mutation to the action that caused it. You can record user sessions and reproduce them just by replaying every action.


Actions are a way of interacting with the store. We use the action object to make changes to the state. It gets passed in as the 2nd argument to the state.

We get the action object to the store using `dispatch`. We use the action type to make meaningful changes to the state.

Eg.

``` 
import { createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    case "RESET":
      return {
        count: 0,
      };
    default:
      return state;
  }
});

console.log(store.getState());

// Actions - then an object that gets sent to the store

// I'd like to increment the count
store.dispatch({
  type: "INCREMENT",
});

store.dispatch({
  type: "INCREMENT",
});

// RESET - set the count equal to zero

store.dispatch({
  type: "RESET",
});

store.dispatch({
  type: "DECREMENT",
});
// I'd like to reset the count to zero

console.log(store.getState()); 
```

Use a switch statement to access the case.

**Subscribe and unsubscribe to a store and dispatching dynamic actions**

Watch for changes to the Redux store state by using subscribe. It will print the state every time it changes.

```
store.subscribe(() => {
  console.log(store.getState());
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

```


call the unsubscribe function after a dispatch to unsubscribe and stop watching for changes.

```
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "INCREMENT",
});

unsubscribe();

```
**IncrementBy and DecrementBy**

incrementBy is available to us on the action object just like type. As is decrementBy.

```
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy,
      };
    case "DECREMENT":
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy,
      };
    case "SET":
      return {
        count: action.count
      };
    case "RESET":
      return {
        count: 0,
      };
    default:
      return state;
  }
});

store.dispatch({
  type: "INCREMENT",
  incrementBy: 5
});

store.dispatch({
  type: "DECREMENT",
  decrementBy: 10
}); 

```

### Destructuring Objects ES6

It allows us to extract properties from an object.

```
const person = {
    name: 'Andrew',
    age: 26,
    location: {
        city: 'Philadelphia',
        temp: 92
    }
};

```
You've got this pretty much repetitive code over and over again, where you need to make a variable from something that is inside of an object. Instead of creating multiple variables like the commented out lines below, we destructure them in a single line instead:

```

// const name = person.name;
// const age = person.age;

const {name = 'Anonymous', age} = person;

console.log(`${name} is ${age}.`);

const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}.`);  
}

```

In the example above, you can set `name = 'Anonymous'` as default fall back if the object did not have a name property. You can also rename a property like `temp` by doing `temp: temperature` as shown. 

### Destructuring Arrays ES6

Similar to destructuring objects, but each variable name in the destructured const is like a placeholder and the numbered order of each item in the corresponding Array.

```
const address = [ '1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

const [street, city, state, zip] =  address;

console.log(`You are in ${city} ${state}.`);
```

if you need to leave out any of the items in the array, you can skip them out like so...

```
const address = [ '1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

const [, , state, zip] =  address;

console.log(`You are in ${state} ${zip}.`);

```

Like objects you can set defaults like so...

```
const address = [ '1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [street, city, state = 'New York'] =  address;

console.log(`You are in ${state}.`);

```

### Refactoring & Organising

Actions are plain JS objects. They also have an optional payload of data. Actions must have a `type` property that indicates the type of action being performed. Types should typically be defined as string constants.

The goal of an action generator, is to be a very simple function to takes input in andreturns the new action object that has the `type` correctly set. 

Below is the earlier actions code refactored with generators.

```
import { createStore } from "redux";

// Action generators - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({count} = {}) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET',
});

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "SET":
      return {
        count: action.count
      };
    case "RESET":
      return {
        count: 0,
      };
    default:
      return state;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});


// store.dispatch({
//   type: "INCREMENT",
//   incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 })); 

store.dispatch(setCount({count: 101}));

```

### Reducers

Actions describe the fact that something happened, but don't specify how the application's state changes in response. This is the job of reducers. 

1. Reducers are pure functions :- the output is only determined by the input, or what was passed in. In the case of a reducer the `state` and the `action`.
2. Never change state or action. Don't mutate them.

**Working with multiple reducers**

Previously we passed reducer functions directly in to `createStore`, but that gets messy really quickly because it only allows one reducer to maintain the entire state. 

Instead we can use `combineReducers`, we call combineReducers passing the return value in to createStore and on this object we define what we want this redux store to look like. So instead of just array, we can define an array and objects like below. The expenses and filters properties are defined by expenses and filters reducers.

```
import { createStore, combineReducers } from 'redux';

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

// Filters reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

console.log(store.getState());

const demoState = {
    expenses: [{
        id: 'sadsdasd',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};
```

###Filtering Redux Data

```
// Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt >= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    });
};

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

```

###Sorting Redux Data

```
// Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt >= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

```

## Connecting React with Redux

**Create Separate Directories within the App's src directory**

* actions
* reducers
* selectors
* store

In 'actions' create an `expenses.js` file and move all of the actions to it and remember to add the `import uuid from 'uuid'` and export each of the named actions, for eg. 

``` 
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

```

We also create `filters.js` file within 'actions' and move all the action generators to it. There are no dependancies in this file, we only need to export the generators.

In 'reducers' create an `expenses.js` file for the expenses reducer. Copt that over and then export it as the default as it's the only reducer function in the file, by removing the `const expensesReducer = ` and adding `export default` eg.

Do the same for the `filters.js` reducer, exporting it as the default in the same way.

```
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                };
            });
        default:
            return state;
    }
};

```
In 'selectors' directory we create an `expenses.js` file and copy of the 'get visible expenses' selector function. This can also be exported as default.

Lastly, we set up the 'store' directory with `configureStore.js`. We import all the dependancies and then create a default function that we can export. In the function we add the store. eg

```
import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// Store creation

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        })
    );

    return store;
};
```

The next step is setting up the `app.js` file so that a new expense can be added and then filtered. Import the expense and filters we set up previously and then dispatch them. The `app.js` should look like this. eg.

```
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    console.log(visibleExpenses);
});

store.dispatch(addExpense({ description: 'Water bill' }));
store.dispatch(addExpense({ description: 'Gas bill' }));

store.dispatch(setTextFilter('bill'));
store.dispatch(setTextFilter('water'));

console.log(store.getState());

ReactDOM.render(<AppRouter />, document.getElementById("app"));
```

### Higher Order Component Pattern (HOC)
HOC is simply a function that takes a React component as an argument and returns another React component. Or simply speaking, a component (The HOC) that renders another component.

It allows us to:

* Reuse code
* Render hijacking
* Prop manipulation
* Abstract state

In the example below the HOCs are the components returned inside the `withAdminWarning` and `requireAuthentication`. The argument passed is a component so it must be captitalised and a regular naming convention is `WrappedComponent` a generic name bearing in mind that it must be reusable.

```

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    // The component returned here is the HOC
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. please don't share!</p>}
            <WrappedComponent {...props} />
        </div>
    );
};


const requireAuthenication = (WrappedComponent) => {
    return (props) => (
        <div>
            {
                props.isAuthenticated ? (
                    <WrappedComponent {...props} />
                    ) : (
                    <p>You must log in to view this message.</p>
                )}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);

const AuthInfo = requireAuthenication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="There are the details" />, document.getElementById('app'));

```

### Connecting Store & Component with React-Redux 

[https://www.npmjs.com/package/react-redux](https://www.npmjs.com/package/react-redux)

[https://react-redux.js.org/introduction/quick-start](https://react-redux.js.org/introduction/quick-start)

React Redux is the official React binding for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update data.

Start by intalling react-redux `yarn add react-redux`.

React Redux provides `<Provider />`, which makes the Redux store available to the rest of your app

Once it's installed, we can import it to the app as a named import. we'll have access to the `Provider` and `connect`. - inside app.js

```
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
```

We then create HOC using `connect` from react-redux. We call connect, we define what we want to get off the store and then we define the component we want to created the connected version off. In this case a bramd new component which is just our component with the props from the store. ExpenseList didn't need anything passed down, we just rendered it as is which was provided to us via connect. - inside ExpenseList.js (component)

```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.filters.text}
        {props.expenses.length}
    </div>
);

const mapSateToProps = (state) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    };
};

export default connect(mapSateToProps)(ExpenseList);

```

Create a stateless functional component called `ExpenseListItem.js`. That looks like this...

Note: we destructure the props object so we have them in the braces

```
import React from 'react';

const ExpenseListItem = ({ description, amount, createdAt }) => (
    <div>
        <h2>{description}</h2>
        <p>{amount}</p>
        <p>{createdAt}</p>
    </div>
);

export default ExpenseListItem;

```

Then inside ExpenseList.js we update it to look like this. We import our stateless function component. In order to get the props on the page, we need use `map` method to iterate over them. Returning `{...expense}` which is destructured expense props. We need to add a key because it uses map. The key in this case is the id.

Note: on the `mapStateToProps` function we can call out selector to access the expenses.

As the first argument passed in to connect, mapStateToProps is used for selecting the part of the data from the store that the connected component needs. It’s frequently referred to as just mapState for short.

* It is called every time the store state changes.
* It receives the entire store state, and should return an object of data this component needs.

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />
        })}
    </div>
);

const mapSateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapSateToProps)(ExpenseList);
```

### Hooking up the filtering to the input field

We hook the input field to the filtering using the onchange event and dispatching the `setTextFilter` action we created previously.

```
import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';

const ExpenseListFilters = (props) => (
    <div>
        <input type="text" value={props.filters.text} onChange={(e) => {
            props.dispatch(setTextFilter(e.target.value));
            console.log(e.target.value);
        }} />
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);
```

We can do something similar for removing an item from the bill -

```
import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
    <div>
        <h2>{description}</h2>
        <p>{amount} - {createdAt}</p>
        <button onClick={(e) => {
            dispatch(removeExpense({ id }));
        }}>Remove</button>
    </div>
);

export default connect()(ExpenseListItem);
``` 
For the above, don't forget that because `removeExpense()` is set up to take an object we need to pass id in like ``removeExpense({ id })`, inside the braces. 

### Controlled dispatch from filters & drop down picking SortBy

**Note: A controlled input is when the input `values` are handled with props from a store and use the `onChange` event handler**


How to dispatch from a connected component - We start by creating a new component called `ExpenseListFilters` then import it in to the `ExpenseDashboardPage` component. 

In `ExpenseListFilters` we add a text input. In order for the component to accept text being entered into the input and the state changing, the text entered must be able to filter the expenses. This means it needs to be able to get the old value from the store. We add props to the input and an onChange event that then dispatches the `setTextFilter` action that we've already set up previously. 

```
<input type="text" value={props.filters.text} onChange={(e) => {
            props.dispatch(setTextFilter(e.target.value));
            // console.log(e.target.value);
        }} />
```

We then add a select element with `date` and `amount` to use for sorting this list of expenses. We can set this up in the same way as above.

```
<select value={props.filters.sortBy} onChange={(e) => {
            e.target.value === 'date' ? props.dispatch(sortByDate(e.target.value)) : props.dispatch(sortByAmount(e.target.value))
            console.log(e.target.value);
        }}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
```

the finished component will look like this... What we are doing is connecting `ExpenseListFilters` to the store - import connect from react-redux then export a connected version of the component and determine what we need from the store, in this case - filters `state.filters` meaning `ExpenseListFilters` will have access to `props.filters.text` and `props.filters.sortBy`.

```
import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount } from '../actions/filters';

const ExpenseListFilters = (props) => (
    <div>
        <input type="text" value={props.filters.text} onChange={(e) => {
            props.dispatch(setTextFilter(e.target.value));
            // console.log(e.target.value);
        }} />
        <select value={props.filters.sortBy} onChange={(e) => {
            e.target.value === 'date' ? props.dispatch(sortByDate(e.target.value)) : props.dispatch(sortByAmount(e.target.value))
            console.log(e.target.value);
        }}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);

```
