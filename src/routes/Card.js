import { Link } from 'react-router-dom';

function Card(props) {
    return ( 
        <div className="list col-md-4">
            <Link to={"/detail/" + props.shoes.id} className='shoeses'>
                <img src={"https://codingapple1.github.io/shop/shoes" + (props.shoes.id + 1) + ".jpg"} width="80%"/>
                <h4 className='text-black'>{props.shoes.title}</h4>
                <p className='text-black'>{props.shoes.content}</p>
            </Link>
        </div>
    );
}

export default Card;