const Trys = ({ trys }) => {
  return (
    <>
      {trys &&
        trys.map((item, i) => {
          return (
            <div key={i}>
              <p>{item}</p>
            </div>
          );
        })}
    </>
  );
};

export default Trys;
