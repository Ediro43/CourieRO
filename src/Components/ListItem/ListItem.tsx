import react from 'React';
import './ListItem.css';

function ListItem(props: any){

    
    return (
        <div className="listItem">
            package
            <p>{props.number}</p>
        </div>
    )
}

export default ListItem;