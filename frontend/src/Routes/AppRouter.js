import { Routes, Route, Router } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { About } from "../components/About"
import { Blog } from "../components/Blog"
import {Info} from "../components/Info"

export const AppRouter = () => {
    return (
        <>
            <Navbar />
            <div className="container p-4">
                <Routes>
                    <Route path="/" element={<About/>} />
                    <Route path="/blog" element={<Blog/>} />
                    <Route path="/info/:blog_id" element={<Info/>} />

                </Routes>
            </div>
            </>
        )
}