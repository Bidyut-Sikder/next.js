export default function Layout({ archive, latest }) {
    return (
        <div>
            <h1>Archive News</h1>
            <section id="archive-filter">
                {archive}
            </section>

            
            <section id="archive-latest">
                {latest}
            </section>


        </div>
    );
}