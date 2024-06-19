import { Link } from 'react-router-dom';

function Card(props) {
    return ( 
        <div className="list col-md-4">
            <Link to={"/detail/" + props.shoes.id} className='shoeses' onClick={() => {
                {
                    // let obj = {"id" : props.shoes.id, "name" : props.shoes.title};
                    // let savedProducts = JSON.parse(localStorage.getItem('watched')) || [];
                    // if (!savedProducts.some(product => product.id === obj.id)) {
                    //     savedProducts.push(obj);
                    //     localStorage.setItem('watched', JSON.stringify(savedProducts));
                    // }
                }}}>
                <img src={"https://codingapple1.github.io/shop/shoes" + (props.shoes.id + 1) + ".jpg"} width="80%"/>
                <h4 className='text-black'>{props.shoes.title}</h4>
                <p className='text-black'>{props.shoes.content}</p>
            </Link>
        </div>
    );
}

export default Card;