import img from './photos/Seenu.jpeg';
import vamsi from './photos/Vamsi.jpeg';

export const H1Tag = (props) => <h1>{props.value}:{props.user}</h1>;
export const PTag = () =><p>This is Para</p>
export const ImgVamsi = () => <img src={vamsi}  width={'100px'} height={'100px'} />
export const ImgStu = () => <img src={img} width={'100px'} height={'100px'} />
