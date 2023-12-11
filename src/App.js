import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { Children } from 'react';
import { useState } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import DefaultLayoutLogin from './layouts/DefaultLayoutLogin';
import DefaultLayoutTwoPage from './layouts/DefaultLayoutTwoPage';
import { publicRoutes, privateRoutes, notFoundRoute, privateRoutes2page } from './routes/index';
import { useEffect } from 'react';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import LandingPage from './pages/landing/LandingPage';

export default function App() {
	const [isLogin, setIsLogin] = useState(localStorage.getItem('accessToken') ? true : false);
	const Page404 = notFoundRoute.component;

	return (
		<BrowserRouter>
			
			<div className="App">
				<Routes>
					{publicRoutes.map((route, index) => {
						const Page = route.component;
						return (
							<Route
								key={index}
								path={route.path}
								element={
									<DefaultLayoutLogin setIsLogin={setIsLogin}>
										<Page />
									</DefaultLayoutLogin>
								}
							/>
						);
					})}
					,
					{privateRoutes.map((route, index) => {
						const Page = route.component;
						const Left = route.Left;
						const Right = route.Right;
						return (
							<Route
								key={index}
								path={route.path}
								element={
									isLogin ? (
										<><Topbar />
										<DefaultLayout setIsLogin={setIsLogin} Left={<Left />} Right={<Right />}>
											<Page />
										</DefaultLayout>
										<Footer />
										</>
									) : (
										<>
										<Navigate
											to="/
                            "
										/>
										</>
									)
								}
							/>
						);
					})}
					,
					{privateRoutes2page.map((route, index) => {
						const Page = route.component;
						const Left = route.Left;

						return (
							<Route
								key={index}
								path={route.path}
								element={
									isLogin ? (
										<><Topbar/>
										<DefaultLayoutTwoPage setIsLogin={setIsLogin} Left={<Left />}>
											<Page />
										</DefaultLayoutTwoPage>
										<Footer />
										</>
									) : (
										<Navigate
											to="/
                            "
										/>
									)
								}
							/>
						);
					})}
					,
					<Route
						key={notFoundRoute.path}
						path={notFoundRoute.path}
						element={
							<><Topbar/>
							<DefaultLayoutLogin>
								<LandingPage />
							</DefaultLayoutLogin>
							<Footer />
							</>
						}
					/>
					,
				</Routes>
			</div>
			
		</BrowserRouter>
	);
}
