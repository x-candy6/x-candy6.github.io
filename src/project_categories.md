---
layout:
permalink: /categories/
title: Project Categories
---


{% for tag in site.tags %}
<p><a href="{{tag.permalink}}">{{tag}}</a></p>
{% endfor %}