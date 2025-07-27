import { Link } from "react-router-dom";
import "./CardBook.css"

function CardBook({ id, title, image, author, date }) {
  return (<> <Link to={"/books/" + id}>
    <div className="book">
      <div className="imgbox">
        <img src={image} />
      </div>
      <a className="author">{author}</a><br />
      <a className="title">{title}</a>
      
      <br /><br />

      <div className="link">
      <div className="date">
          Date : {date}
        </div>
        <button>view</button>
      
      </div>
    </div>
  </Link></>)
}

export default CardBook