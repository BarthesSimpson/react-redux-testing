# React / Redux testing examples

* [react-testing-library](https://github.com/kentcdodds/react-testing-library)
* [redux-testkit](https://github.com/wix/redux-testkit)
* [redux-saga-tester](https://github.com/wix/redux-saga-tester)

## Unit Tests

* These are at the Redux level, and test either:
  * That a reducer behaves as expected given a certain action
  * That a saga causes the expected side effect(s) given a certain action

* There are no React unit tests, because of the following principle:
  > Tests should test behavior, not implementation details

## Integration Tests


## End to End Tests

* TK

## Snapshot Tests

* There are no snapshot tests, because they are an antipattern (willing to discuss in more depth if needs be :)
