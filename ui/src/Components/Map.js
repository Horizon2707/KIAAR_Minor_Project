{forParams.map((element) => {
  if (element.PARAMETER_TYPE === "HEADING") {
    return (
      <>
        <Th>{element.PARAMETER_NAME}</Th>
      </>
    );
  }
  if (element.PARAMETER_TYPE === "PARAMETER") {
    return (
      <>
        <Td>{element.PARAMETER_NAME}</Td>
        <Td>
          <Input
            type="number"
            size="sm"
            id={element.PARAMETER_ID}
            htmlSize={4}
            width="auto"
            variant="filled"
            value={resValues[element.PARAMETER_ID]}
            onChange={(e) => {
              ressetValues({
                ...resValues,
                [element.PARAMETER_ID]: e.target.value,
              });
            }}
          ></Input>
        </Td>
        <Td>{element.PARAMETER_RANGE.LOW}</Td>
        <Td>{element.PARAMETER_RANGE.MEDIUM}</Td>
        <Td>{element.PARAMETER_RANGE.HIGH}</Td>
      </>
    );
  }
});}
