<template>
    <div>
        <cp-header></cp-header>
        <section id="content" class="container">
            <div class="col grid12">
                <div class="ajax-post-container">
                    <div class="col grid8 pct"><h2 class="section-title no-top-padding">
                        <span>We’d love to hear from you</span></h2>
                        <p></p>
                        <div role="form" class="wpcf7" id="wpcf7-f7-p8-o1" lang="en-US" dir="ltr">
                            <div class="screen-reader-response"></div>
                            <form action="/cross/contact/#wpcf7-f7-p8-o1" method="post" class="wpcf7-form demo"
                                  novalidate="novalidate">
                                <div style="display: none;"><input type="hidden" name="_wpcf7" value="7"> <input
                                        type="hidden" name="_wpcf7_version" value="5.0.1"> <input type="hidden"
                                                                                                  name="_wpcf7_locale"
                                                                                                  value="en_US"> <input
                                        type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f7-p8-o1"> <input type="hidden"
                                                                                                            name="_wpcf7_container_post"
                                                                                                            value="8"></div>
                                <div class="col grid6 pct"><span class="wpcf7-form-control-wrap your-name"><input
                                        type="text" name="your-name" value="" size="40"
                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required full-width"
                                        id="your-name" aria-required="true" aria-invalid="false" placeholder="Name"></span>
                                </div>
                                <div class="col grid6 pct omega"><span class="wpcf7-form-control-wrap your-email"><input
                                        type="text" name="your-email" value="" size="40"
                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required full-width"
                                        id="your-email" aria-required="true" aria-invalid="false"
                                        placeholder="Email"></span></div>
                                <div class="clear"></div>
                                <div class="col grid12 pct"><span class="wpcf7-form-control-wrap your-message"><textarea
                                        name="your-message" cols="40" rows="10"
                                        class="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required full-width"
                                        id="your-message" aria-required="true" aria-invalid="false"
                                        placeholder="Message"></textarea></span></div>
                                <p><input type="submit" value="Send Message" class="wpcf7-form-control wpcf7-submit"><span
                                        class="ajax-loader"></span></p>
                                <div class="wpcf7-response-output wpcf7-display-none"></div>
                            </form>
                        </div>
                        <br></div>
                    <div class="col grid4 omega pct"><h2 class="section-title no-top-padding"><span>Extra Information</span>
                    </h2>
                        <ul class="accordion only-one-visible">
                            <li class="active"><h5 class="accordion-title">Email, Phone, Fax</h5>
                                <div class="accordion-content"><strong>Email:</strong> <a
                                        href="#">contact@cross-theme.com</a><br> <strong>Phone:</strong> <a href="#">(+12)
                                    456 789012</a><br> <strong>Fax:</strong> <a href="#">(+12) 456 789012</a></div>
                            </li>
                            <li><h5 class="accordion-title">Social Links</h5>
                                <div class="accordion-content"><a class="social-link icon-facebook" href="#"
                                                                  target="_blank"></a> <a class="social-link icon-twitter"
                                                                                          href="#" target="_blank"></a> <a
                                        class="social-link icon-googleplus" href="#" target="_blank"></a> <a
                                        class="social-link icon-pinterest" href="#" target="_blank"></a> <a
                                        class="social-link icon-dribbble" href="#" target="_blank"></a></div>
                            </li>
                            <li><h5 class="accordion-title">On Google Maps</h5>
                                <div class="accordion-content"><a
                                        href="https://maps.google.com/maps?q=Brooklyn%2BBridge&amp;hl=en&amp;ll=40.70797,-73.9991&amp;spn=0.018836,0.042272&amp;sll=40.714737,-73.975925&amp;sspn=0.075336,0.169086&amp;hq=Brooklyn%2BBridge&amp;t=m&amp;z=14"><img
                                        src="http://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&amp;zoom=14&amp;size=640x480&amp;scale=2&amp;maptype=roadmap&amp;sensor=false"
                                        alt=""></a></div>
                            </li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </section>
        <cp-footer></cp-footer>
    </div>
</template>

<script>
    import CpHeader from "../CpHeader.vue";
    import CpFooter from "../CpFooter.vue";

    export default {
        name: "contact",
        components: {
            CpFooter,
            CpHeader
        }
    }
</script>

<style scoped>

</style>