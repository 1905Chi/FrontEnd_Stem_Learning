import React from 'react';
import Home from '../pages/home/Home';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import ForgotPassword from '../pages/auth/forgotpassword/ForgotPassword';
import Left from '../layouts/Left';
import LeftsGroup from '../pages/group/layouts/LeftsGroup';
import NotFound from '../pages/notFound/NotFound';
import Verify from '../pages/auth/verify/Verify';
import Right from '../layouts/Right';
import LeftCreateGroup from '../pages/group/layouts/LeftCreateGroup';
import CreateGroup from '../pages/group/create/CreateGroup';
import LeftItemGroup from '../pages/group/layouts/LeftItemGroup';
import MainGroup from '../pages/group/itemgroup/MainGroup';
import Profile from '../pages/profile/Profile';
import RightProfile from '../../src/pages/profile/layouts/RightProfile';
import EditPost from '../pages/home/components/EditPost';
import LandingPage from '../pages/landing/LandingPage';
import RegisterParent from '../pages/auth/register/RegisterParent';
import RegisterTeacher from '../pages/auth/register/RegisterTeacher';
import LeftClass from '../pages/class/layouts/LeftClass';
import Class from '../pages/class/Class';
import LeftItemClass from '../pages/class/layouts/LeftItemClass';
import RightClass from '../pages/class/layouts/RightClass';
import CreateQuiz from '../pages/class/exam/CreateQuiz ';
import RightItemGroup from '../pages/group/layouts/RightItemGroup';
import LeftFriend from '../pages/friend/layouts/LeftFriend';
import MainFriend from '../pages/friend/MainFriend';
import ProfileUser from '../pages/profile/ProfileUser/Profile';
import ExamItem from '../pages/class/exam/ExamItem/ExamItem';
import Submit from '../pages/class/exam/ExamItem/Submit';
import LeftSubmit from '../pages/class/layouts/LeftSubmit';

import MainSearch from '../pages/search/main/MainSearch';
import LeftSearch from '../pages/search/layout/LeftSearch';
import LeftEditExam from '../pages/class/layouts/LeftEditExam';
import EditExam from '../pages/class/exam/ExamItem/EditExam';
import User from '../pages/user/User';
import Subject from '../pages/subject/Subject';
import Address from '../pages/address/Address';
import ManageGroup from '../pages/manageGroup/ManageGroup';
import Parent from '../pages/user/Parent';
import RightParent from '../pages/user/layouts/RightParent';
import MainCompetition from '../pages/competition/itemCompetition/MainCompetition';
import Meessage from '../pages/messenger/Message';
import SubmitCompetition from '../pages/competition/itemCompetition/SubmitCompetition';
const privateRoutes = [
	{ path: '/home', component: Home, Left: Left, Right: Right },

	{ path: '/groups/:uuid', component: MainGroup, Left: LeftItemGroup, Right: RightItemGroup },
	{ path: '/classes/:uuid', component: MainGroup, Left: LeftItemGroup, Right: RightItemGroup },

	
];

const privateRoutes2page = [
	{ path: '/groups/create', component: CreateGroup, Left: LeftCreateGroup },
	{ path: '/classes/create', component: CreateGroup, Left: LeftCreateGroup },
	{ path: '/friends', component: MainFriend, Left: LeftFriend },

	{ path: '/classes/:uuid/edit-exam/:id', component: EditExam, Left: LeftEditExam },

	{ path: '/exam/:id/submit/', component: Submit, Left: LeftSubmit },
	{ path: '/classes', component: Class, Left: RightClass },
	{ path: '/groups', component: Class, Left: LeftsGroup },
	{ path: '/parent', component: Parent, Left: Left},
];

const private1page = [
	{ path: '/classes/:uuid/exam/createquiz', component: CreateQuiz },
	{ path: '/profile', component: Profile },
	{ path: '/profile/:uuid', component: ProfileUser },
	{ path: '/classes/:uuid/exam/:id', component: ExamItem },
	{ path: '/users', component: User, Left: Left, Right: Right },
	{ path: '/subjects', component: Subject, Left: Left },
	{ path: '/addresses', component: Address, Left: Left },
	{ path: '/manage/groups', component: ManageGroup },
	{ path: '/messenger/u/:userId', component: Meessage },
	{ path: '/messenger/g/:chatRoomId', component: Meessage },
	{ path: '/messenger', component: Meessage },
	{ path: '/competition/:uuid', component: MainCompetition },
	{ path: '/competition/:uuid/submition/:id', component: SubmitCompetition },
];
const publicRoutes = [
	{ path: '/login', component: Login },
	{ path: '/register', component: RegisterTeacher },
	{ path: '/forgot-password/', component: ForgotPassword },
	{ path: '/forgot-password/:uuid', component: ForgotPassword },
	{ path: '/verify/:uuid', component: Verify },
	{ path: '/', component: LandingPage },
];

const publicRoutes2 = [{ path: '/search', component: MainSearch, Left: LeftSearch }];

const notFoundRoute = { path: '*', component: NotFound };
export { privateRoutes, publicRoutes, notFoundRoute, privateRoutes2page, private1page, publicRoutes2 };
