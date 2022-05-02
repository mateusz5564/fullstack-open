const Filter = ({ nameSearch, setNameSearch }) => {
  return (
    <>
      filter shown with <input value={nameSearch} onChange={e => setNameSearch(e.target.value)} />
    </>
  );
};

export default Filter;
