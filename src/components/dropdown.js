export default function Dropdown({ selectedValue, SetSelectedVlaue }) {
  return (
    <div id="dropdown" style={{ paddingTop: "10px", paddingLeft: "75px" }}>
      <select
        id="years"
        style={{
          appearance: "none",
          paddingRight: "20px",
          paddingLeft: "20px",
          paddingTop: "5px",
          paddingBottom: "5px",
          fontSize: "15px",
          fontFamily: "cursive",
          textAlign: "center",
          borderRadius: "10px",
        }}
        value={selectedValue}
        onChange={SetSelectedVlaue}
      >
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
      </select>
    </div>
  );
}
