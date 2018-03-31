# React / Redux testing examples

* [react-testing-library](https://github.com/kentcdodds/react-testing-library)
* [redux-testkit](https://github.com/wix/redux-testkit)
* [redux-saga-tester](https://github.com/wix/redux-saga-tester)

## Unit Tests

* These are at the Redux level, and test either:
  * That a reducer behaves as expected given a certain action
  * That a saga/thunk causes the expected side effect(s) given a certain action

* These tests are ideal for TDD

* There are no React unit tests, because of the following principle:
  > Tests should test behavior, not implementation details

## Integration Tests

* These are at the React level, and test:
  * That a page behaves as expected given a certain user action

* These tests are harder to practice TDD, but it is possible with a little practice. At the very least, I recommend writing the test descriptions before writing the implementation, even if the exact assertions are hard to write ahead of time (due to uncertainty surrounding the precise APIs one will use to access DOM elements in the final test). 

## End to End Tests

* These are at the application level, and test:
  * That the fully rendered application behaves as expected in the browser given a certain user action

* These tests are not so great for TDD because of the slower feedback loop. However, they are extremely valuable for production and I recommend them as part of any robust CI/CD pipeline.

## Snapshot Tests

* There are no snapshot tests, because they are an antipattern (willing to discuss in more depth if needs be :)
