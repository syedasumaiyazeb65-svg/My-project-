// সব প্রোডাক্ট বক্সগুলোকে সিলেক্ট করা হলো
const productBoxes = document.querySelectorAll('.product-box');

// প্রতিটি বক্সের জন্য ক্লিক ইভেন্ট লিসেনার যোগ করা হলো
productBoxes.forEach(box => {
    box.addEventListener('click', function() {
        // বক্সে যে <h3> লেখা আছে তা সংগ্রহ করা হলো
        const productType = this.querySelector('h3').innerText;
        
        // পপ-আপ মেসেজ দেখানো হলো
        alert(`Hello Beautiful! Time to glam up with your ${productType}!`);
    });
});