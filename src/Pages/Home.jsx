import Dropdown from '../component/Dropdown';
import { useState} from "react";
import welcomeImg from "../img/background_3.png";
import Description from "../component/Description";
import MatrixImage from "../component/MatrixImage";
import axios from '../api/axios';
import Loading from '../component/Loading';

const Home = () => {
  const [matrix, setMatrix] = useState(null);
  const [matrixImg, setMatrixImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValidDate = (value) => {
    return !isNaN(Date.parse(value));
  };

  const handleDateSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const date = e.target[0].value;
    if (!isValidDate(date)) {
      setIsLoading(false);
      return alert("Дата введена неправильно");
    }
    const dob = new Date(date);
    const day = dob.getDate();
    const month = dob.getMonth() + 1;
    const year = dob.getFullYear();
    try{
      const response = await axios.post("/",
      {
        day:day,
        month:month,
        year:year
      }
      )
      if (response.status===200) {
        const data = await response.data;
        setMatrix(data.matrix);
        setMatrixImg(data.img);
      }
      setIsLoading(false)
    }
    catch(err){
      if(err?.response?.data){
        const data = await err.response.data;
        setMatrix(data.matrix);
        setMatrixImg(data.img);
      }
      setIsLoading(false);
  };
}
  return (
    <section className="container">
      {isLoading && <Loading/>}
          <div className="row mt-5 welcome">
          <img src={welcomeImg} className="welcome-image" alt="Welcome_image" />
          <form className="welcome-form" onSubmit={handleDateSubmit}>
            <div className="date-input-fields row justify-center align-center mb-2">
              <div className="col p-1">
                <input type="date" placeholder="Ваша Дата рождения" />
              </div>
              <div className="col p-1">
                <button className="date-submit-button p-1 no-wrap" type="submit">
                  Подтвердить дату
                </button>
              </div>

            </div>
          </form>
        </div>
        {matrix && <MatrixImage image={matrixImg} />}
        {!matrix && <Description/>}
        <div className="dropdown-main">
          {matrix &&
            Object.keys(matrix).map((el, id) => {
              return (
                <Dropdown
                  key={id}
                  label={matrix[el].label}
                  initial={matrix[el].initial}
                  description={matrix[el].description}
                  isFree={matrix[el].isFree}
                />
              );
            })}
        </div>
    </section>
 
  );
};
export default Home;
