import { useState } from "react";

const About = () => {
  const [title, setTitle] = useState("О нас");
  const [text, setText] = useState(
    "Мы профессиональная команда эзотериков и энтузиастов которая хочет поделиться своими наработками и опытом с желающими. В нашу команду входят кармологи и тарологи со всего мира. Мы постарались собрать лучшую команду из профессионалов чтобы сделать расчет точнейшим из существующих ныне."
  );
  return (
    <div className="container">
      <div className="row justify-center mt-2">
        <h1 className="col text-center">{title}</h1>
      </div>
      <div className="row justify-center text-justify px-1">
        <div className="col">{text}</div>
      </div>
    </div>
  );
};

export default About;
