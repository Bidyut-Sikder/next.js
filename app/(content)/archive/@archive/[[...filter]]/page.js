import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";





const FilteredNews = async ({ year, month }) => {
    let news;

    if (year && !month) {
        news = await getNewsForYear(year);

    } else if (year && month) {
        news = await getNewsForYearAndMonth(year, month)
    }

    let newsContent = <p>No news found for the selected period.</p>

    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />
    }
    return newsContent

}

const FilteredHeader = async ({ year, month }) => {
    const avilableYears = await getAvailableNewsYears()
    let links = avilableYears

    if (year && !month) {

        links = getAvailableNewsMonths(year)
    }

    if (year && month) {

        links = []
    }
    if (
        (year && !avilableYears.includes(year)) ||
        (month && !getAvailableNewsMonths(year).includes(month))
    ) {


        throw new Error('Invalid filter.');
    }

    return (
        <header id="archive-header">
            <nav>
                <ul>
                    {
                        links.map(((link) => {
                            const href = year ?
                                `/archive/${year}/${link}` :
                                `/archive/${link}`
                            return (
                                <li key={link}>
                                    <Link href={href}>{link} </Link>
                                </li>
                            )
                        }))
                    }
                </ul>
            </nav>
        </header>
    )
}


export default async function FilteredNewsPage({ params }) {
    const { filter } = params;

    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1]










    return <>

        {/* <Suspense fallback={<p>Loading...SuspenseHeader</p>}>
            <FilteredHeader year={selectedYear} month={selectedMonth} />

        </Suspense> */}
        <Suspense fallback={<p>Loading...</p>}>
            <FilteredHeader year={selectedYear} month={selectedMonth} />

            <FilteredNews year={selectedYear} month={selectedMonth} />

        </Suspense>


    </>
}