Freelancer task

demo on : http://demo.alampk.com/ajax-search-freelancer/

ajax autocomplete
search terms separated by space

job description:
-----------------
We simply need the code to do the following:

- MYSQL Database has a list of shirts, with size, color, manufacturer, itemnumber, distributor

- We want to be able to type in a search box, and as we type, it display selective drop down of results.

- We however want it to search all fields (that we have in array), and match based on LIKE of what is typed, and narrow search by the string...each string would be separated by a space.

For instance:

TABLE

id itemnum color distributor size manufacturer

1 su-901 blue Carmens L ATeam

2 su-911 black Carmens XL ATeam

3 ar-xer blue Tanner L Colonel

4 su-907 white Carmens L ATeam

In the search field, if I type

"Ta blue" the dropdown would only show id 3

"Carm L" the dropdown would show id 1, 2 and 4

basically, as we type, it starts to narrow the field.

And instead of showing the ID as the select, it will show the full result as the select

su-901 blue Carmens L ATeam

su-911 black Carmens XL ATeam

su-907 white Carmens L ATeam

We need nothing fancy, as it's being plugged into our current site...just the html, ajax and java code.