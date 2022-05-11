# BASIC

<lcd-digit id="unit-seconds" digit="2"></lcd-digit>

console:
document.dispatchEvent(new CustomEvent('lcd-digit\_\_set-digit', {detail:{id:'unit-seconds', digit: 9}}))

# TWO DIGITS

<lcd-digit id="dec-seconds" digit="0" lcd-reference="unit-seconds"> </lcd-digit>
<lcd-digit id="unit-seconds" digit="0" count></lcd-digit>

# TWO DIGITS WITH LIMITS

<lcd-digit id="dec-seconds" digit="5" lcd-reference="unit-seconds" max-value="5"> </lcd-digit>
<lcd-digit id="unit-seconds" digit="2" count></lcd-digit>

# FINAL

<lcd-digit id="dec-minutes" digit="0" lcd-reference="dec-minutes"></lcd-digit>
<lcd-digit id="unit-minutes" digit="0" lcd-reference="dec-seconds"></lcd-digit>
<lcd-digit digit=":"></lcd-digit>
<lcd-digit id="dec-seconds" digit="5" lcd-reference="unit-seconds" max-value="6"> </lcd-digit>
<lcd-digit id="unit-seconds" digit="2" count></lcd-digit>
