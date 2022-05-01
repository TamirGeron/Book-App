export function LongTxt({ text, isLongTxtShown }) {
    const content = isLongTxtShown ? text : text.substring(0, 10)
    return <section className="long-txt">
        <p>{content}</p>
    </section>
}
