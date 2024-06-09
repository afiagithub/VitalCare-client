# Website Name
afia-b9a12-vitalcare-diagnostic-center-management-system

# Live Site URL
https://diagnostic-app-auth.web.app/

# test_ID: 
test12_category_0004

# Features
* **Home** page contains a banner, shows 6 featured (most booked) tests information dynamically, shows promotional events of the diagnostic center and lastly shows personalized health recommendations.
<br>

* By clicking on the view details button of a test card, we are taken to another page containing that test's details (title, image, cost, slots left, time, date, description etc.)
<br>

* **All Tests** shows all the tests as cards and each card has a *View Detail* button that redirects to the specific test details.
<br>

* **Test Details** is a private(route) page. This page contain an *book now* button. By clicking on the button an user is provided with a booking form. We can provide necessary information in the booking form and book that test.
<br>

* **Doctors List** shows all the doctor's information as cards.
<br>

* **Packages** shows all health plan's information as cards.
<br>

* **Blogs** shows all blogs information as cards. By clicking on a blog card with taken to another page **Blog Details** that shows a blog in full details(title, blog content, blogge name, date etc.).
<br>

* **Dashboard** is a private(route) page. This page shows is different for users and admin. It shows Profile of user/admin that is logged in.
<br>

# User Pages (in dashboard):
* **Appointments** is a private(route) page. This page shows the tests that an user has booked which are pending. It means the report of these tests are not delivered
<br>

* **Test Result** is a private(route) page. This page shows the tests that an user has booked which are pending. It has a download button for each test. By clicking this button the user can see and download their report.
<br>

# Admin Pages (in dashboard):
* **All Users** page shows all users' information. An admin can block an user, make an user admin and also download their profile information and test records as a pdf file.
<br>

* **Add a Test** page contains a form to add a test. By providing all necessary information we can submit and add a test to the database.
<br>

* **All Tests** shows all test' information. It has a *update*, *delete button* and a *show bookings* button. By clicking *update* button, we can change information in the form and update that test's information in database. The *delete* button delete a test data from the database. The *show bookings* button shows an admin all the bookings of that specific test.
<br>

* **Show Bookings** shows an admin all the bookings of that specific test. It has a *cancel* and a *submit report* button. The *cancel* button deletes that reservation from the database. The *submit report* button provides a form to submit report.
<br>

* **Add Banner** is a private(route) page. This page contain a form to add a banner. By providing all necessary information we can submit and add a banner to the database.
<br>

* **All Banner** is a private(route) page. This page shows all test' information. It has a *active* and*delete button*. By clicking *active* button on a banner, we can make that banner **active** and all other banners become inactive at the same time. The *delete* button delete a banner data from the database.
<br>

* **Statistics** page contains a bar chart that shows all the tests that booked and the number of bookings. It also contains a pie chart that shows the ratio of pending/delivered test results.
<br>

# Characteristics
* Navigation Bar is fixed across all the pages of the website except the dashboard.
<br>

* In the Navigation Bar, when a user is logged in, that user's name, image can be seen. Otherwise, Login & Register button is shown
<br>

* If an user tries to access a private route without logging in, the user is taken to the **sign in** page and after loggin in, the user is redirected to the intended page
<br>

* Footer section is fixed across all the pages of the website except the dashboard
<br>

* **Toast** is shown with appropriate message for all the actions and conditions (like register, login, errors, successfull addition and update of test, booking, banner information etc.)
<br>


# Used npm packages -
* SeewtAlert2
* Rechart
* Stripe
* React Axios
* jsPDF
* React-tooltip
* React helmet async

