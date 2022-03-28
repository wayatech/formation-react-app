const withDate = (Component) =>
  function () {
    return <Component date={new Date()} />
  }

export default withDate
