---
layout: post
title:  "Match the design of input fields to look like Select2 fields"
date:   2021-03-17 12:00:00
categories: select2 design css
excerpt: "Make your regular input fields have the same style as Select2 inputs."
---

Whilst creating a mixed form, there were fields on a form that did not match the default style of a Select2 input. I created this bit of CSS that creates a style that can be applied to the other fields so they match. Feel free to use this code.

This is what the page looked like before:
![](/assets/images/posts/fake-select2-before.png) 


The page with the CSS applied:
![](/assets/images/posts/fake-select2-after.png) 


As you can see the input and textarea now look much more like the Select2 box in the middle of the picture.

## Code

If you have any further improvements feel free to [create in a PR for this post][github].

I have purposely left the blue hue that appears around the box for usability, if you want to remove that add `outline: 0;`.

### HTML

To use in your form apply the following classes:

```
<input class="fake-select2 fake-select2-input />
<textarea class="fake-select2 fake-select2-textarea"></textarea>
```
### CSS

This is the CSS that needs adding to create these boxes.

```
.fake-select2{
  border-radius:4px 4px 4px 4px;
  border:1px solid grey;
  padding:5px;
  font-family:Metropolis,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  font-size:.85rem;
  font-weight:400;
  color:#444
}

.fake-select2.fake-select2-input{
  line-height:42px
}

.fake-select2.fake-select2-textarea{
  line-height:1rem;
  padding:10px 5px
}
```


#### Reformatted into SCSS

```
.fake-select2 {
  -moz-border-radius:4px 4px 4px 4px;
  -webkit-border-radius: 4px 4px 4px 4px;
  border-radius:4px 4px 4px 4px;
  border:1px solid gray;
  padding: 5px;
  font-family: Metropolis,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  font-size: .85rem;
  font-weight: 400;
  color: #444;

  &.fake-select2-input {
    line-height: 42px;
  }

  &.fake-select2-textarea {
    line-height: 1rem;
    padding: 10px 5px 10px 5px;
  }
}
```


[github]: https://github.com/NiallBunting/niallbunting.github.io/tree/master/_posts
