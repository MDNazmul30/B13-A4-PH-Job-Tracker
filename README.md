
# JavaScript Basic Questions

## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**Answer:**  
- **getElementById:** we got the element based on a unique id.  
- **getElementsByClassName:** Here we got multiple element based on a classname.  
- **querySelector():** This function is used to get the first element that matches a css selector.  
- **querySelectorAll():** This function is used to get all matches a css selector.  

---

## 2. How do you create and insert a new element into the DOM?

**Answer:**  
```javascript
let insertDiv = document.createElement("div"); 
insertDiv.innerText = "Hello World";
document.body.appendChild(insertDiv);
````

---

## 3. What is Event Bubbling? And how does it work?

**Answer:**
Event bubbling is when an event starts at the element we clicked and then move to its parent elements automatically.

**How it works:**

* First of all when we click an element, The event happens on that element first.
* Then the same event “bubbles up” to its parent, then grandparent, and so on, until it reaches the top of the page.

---

## 4. What is Event Delegation in JavaScript? Why is it useful?

**Answer:**
Event Delegation is a pattern used to handle events efficiently by attaching a single event listener to a parent element instead of adding listeners to multiple similar child elements, and then identifying the actual source of the event using the event.target property.

**It's useful because:**

* Saves time and memory.
* It works properly even if we add new child later.


