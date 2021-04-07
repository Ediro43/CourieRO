import react from 'React';
import ListItem from '../ListItem/ListItem';
import './Packages.css'

function Packages(){

    function renderItems(){
        const numberOfItems = [
            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17
        ]

        let renderedItems = numberOfItems.map((item, i) => {
            return (
                <ListItem number={numberOfItems[i]}/>
            )
        })

        return renderedItems

    }

    return (
        <div className="packagesPage">
            {/* <ListItem/> */}
            <div className="topPart">
                Some message
            </div>
            <div className="renderedItems">
                {renderItems()}
            </div>
            
        </div>
    )
}

export default Packages;