import "./charItem.scss";

const CharItem = ({ char, onCharClick, active }) => {
    const { name, thumbnail } = char;

    let imgStyle = { objectFit: "cover" };
    if (
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
        imgStyle = { objectFit: "fill" };
    }

    const activeClassChar = active
        ? "char__item char__item_selected"
        : "char__item";

    return (
        <li className={activeClassChar} onClick={onCharClick} tabIndex={0}>
            <img src={thumbnail} alt={name} style={imgStyle} />
            <div className="char__name">{name}</div>
        </li>
    );
};

export default CharItem;
