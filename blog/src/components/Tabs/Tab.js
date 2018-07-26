import React from 'react';
import './tabs.css'
const Tab = ({active, tab, onClick}) => {
    const style = active.id === tab.id ? "tab active-tab" : 'tab';
    return(
        <div className={style} onClick={(i) => onClick(tab.id)}>
            {tab.tag}
        </div>
    )
}
export default Tab;