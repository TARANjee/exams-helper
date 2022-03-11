import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";


export const List = (foot) => {
    
    const matches = useMediaQuery('(min-width:850px)', { 'noSsr': true });

    return (
        <div className={!foot && matches ? 'Items' : 'col'}>
            <li className={matches ? 'link' : 'menuList'}>
                <Link to='/' className='link'>Home</Link>
            </li>
            <li className={matches ? 'link' : 'menuList'}>
                <Link to='/questionpaper' className='QPaper link'>Question Paper</Link>
            </li>

            <li className={matches ? 'link' : 'menuList'}>
                <Link to='/notes' className='link QPaper'>Study Material</Link>
            </li>
            <li className={matches ? 'link' : 'menuList'}>
                <Link to='/about' className='link'>About</Link>
            </li>
            <li className={matches ? 'link' : 'menuList'}>
                <Link to='/contact' className='link'>Contact</Link>
            </li>
        </div>
    )
}