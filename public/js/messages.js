/*!
 *  Lang.js for Laravel localization in JavaScript.
 *
 *  @version 1.1.10
 *  @license MIT https://github.com/rmariuzzo/Lang.js/blob/master/LICENSE
 *  @site    https://github.com/rmariuzzo/Lang.js
 *  @author  Rubens Mariuzzo <rubens@mariuzzo.com>
 */
(function(root,factory){"use strict";if(typeof define==="function"&&define.amd){define([],factory)}else if(typeof exports==="object"){module.exports=factory()}else{root.Lang=factory()}})(this,function(){"use strict";function inferLocale(){if(typeof document!=="undefined"&&document.documentElement){return document.documentElement.lang}}function convertNumber(str){if(str==="-Inf"){return-Infinity}else if(str==="+Inf"||str==="Inf"||str==="*"){return Infinity}return parseInt(str,10)}var intervalRegexp=/^({\s*(\-?\d+(\.\d+)?[\s*,\s*\-?\d+(\.\d+)?]*)\s*})|([\[\]])\s*(-Inf|\*|\-?\d+(\.\d+)?)\s*,\s*(\+?Inf|\*|\-?\d+(\.\d+)?)\s*([\[\]])$/;var anyIntervalRegexp=/({\s*(\-?\d+(\.\d+)?[\s*,\s*\-?\d+(\.\d+)?]*)\s*})|([\[\]])\s*(-Inf|\*|\-?\d+(\.\d+)?)\s*,\s*(\+?Inf|\*|\-?\d+(\.\d+)?)\s*([\[\]])/;var defaults={locale:"en"};var Lang=function(options){options=options||{};this.locale=options.locale||inferLocale()||defaults.locale;this.fallback=options.fallback;this.messages=options.messages};Lang.prototype.setMessages=function(messages){this.messages=messages};Lang.prototype.getLocale=function(){return this.locale||this.fallback};Lang.prototype.setLocale=function(locale){this.locale=locale};Lang.prototype.getFallback=function(){return this.fallback};Lang.prototype.setFallback=function(fallback){this.fallback=fallback};Lang.prototype.has=function(key,locale){if(typeof key!=="string"||!this.messages){return false}return this._getMessage(key,locale)!==null};Lang.prototype.get=function(key,replacements,locale){if(!this.has(key,locale)){return key}var message=this._getMessage(key,locale);if(message===null){return key}if(replacements){message=this._applyReplacements(message,replacements)}return message};Lang.prototype.trans=function(key,replacements){return this.get(key,replacements)};Lang.prototype.choice=function(key,number,replacements,locale){replacements=typeof replacements!=="undefined"?replacements:{};replacements.count=number;var message=this.get(key,replacements,locale);if(message===null||message===undefined){return message}var messageParts=message.split("|");var explicitRules=[];for(var i=0;i<messageParts.length;i++){messageParts[i]=messageParts[i].trim();if(anyIntervalRegexp.test(messageParts[i])){var messageSpaceSplit=messageParts[i].split(/\s/);explicitRules.push(messageSpaceSplit.shift());messageParts[i]=messageSpaceSplit.join(" ")}}if(messageParts.length===1){return message}for(var j=0;j<explicitRules.length;j++){if(this._testInterval(number,explicitRules[j])){return messageParts[j]}}var pluralForm=this._getPluralForm(number);return messageParts[pluralForm]};Lang.prototype.transChoice=function(key,count,replacements){return this.choice(key,count,replacements)};Lang.prototype._parseKey=function(key,locale){if(typeof key!=="string"||typeof locale!=="string"){return null}var segments=key.split(".");var source=segments[0].replace(/\//g,".");return{source:locale+"."+source,sourceFallback:this.getFallback()+"."+source,entries:segments.slice(1)}};Lang.prototype._getMessage=function(key,locale){locale=locale||this.getLocale();key=this._parseKey(key,locale);if(this.messages[key.source]===undefined&&this.messages[key.sourceFallback]===undefined){return null}var message=this.messages[key.source];var entries=key.entries.slice();var subKey="";while(entries.length&&message!==undefined){var subKey=!subKey?entries.shift():subKey.concat(".",entries.shift());if(message[subKey]!==undefined){message=message[subKey];subKey=""}}if(typeof message!=="string"&&this.messages[key.sourceFallback]){message=this.messages[key.sourceFallback];entries=key.entries.slice();subKey="";while(entries.length&&message!==undefined){var subKey=!subKey?entries.shift():subKey.concat(".",entries.shift());if(message[subKey]){message=message[subKey];subKey=""}}}if(typeof message!=="string"){return null}return message};Lang.prototype._findMessageInTree=function(pathSegments,tree){while(pathSegments.length&&tree!==undefined){var dottedKey=pathSegments.join(".");if(tree[dottedKey]){tree=tree[dottedKey];break}tree=tree[pathSegments.shift()]}return tree};Lang.prototype._applyReplacements=function(message,replacements){for(var replace in replacements){message=message.replace(new RegExp(":"+replace,"gi"),function(match){var value=replacements[replace];var allCaps=match===match.toUpperCase();if(allCaps){return value.toUpperCase()}var firstCap=match===match.replace(/\w/i,function(letter){return letter.toUpperCase()});if(firstCap){return value.charAt(0).toUpperCase()+value.slice(1)}return value})}return message};Lang.prototype._testInterval=function(count,interval){if(typeof interval!=="string"){throw"Invalid interval: should be a string."}interval=interval.trim();var matches=interval.match(intervalRegexp);if(!matches){throw"Invalid interval: "+interval}if(matches[2]){var items=matches[2].split(",");for(var i=0;i<items.length;i++){if(parseInt(items[i],10)===count){return true}}}else{matches=matches.filter(function(match){return!!match});var leftDelimiter=matches[1];var leftNumber=convertNumber(matches[2]);if(leftNumber===Infinity){leftNumber=-Infinity}var rightNumber=convertNumber(matches[3]);var rightDelimiter=matches[4];return(leftDelimiter==="["?count>=leftNumber:count>leftNumber)&&(rightDelimiter==="]"?count<=rightNumber:count<rightNumber)}return false};Lang.prototype._getPluralForm=function(count){switch(this.locale){case"az":case"bo":case"dz":case"id":case"ja":case"jv":case"ka":case"km":case"kn":case"ko":case"ms":case"th":case"tr":case"vi":case"zh":return 0;case"af":case"bn":case"bg":case"ca":case"da":case"de":case"el":case"en":case"eo":case"es":case"et":case"eu":case"fa":case"fi":case"fo":case"fur":case"fy":case"gl":case"gu":case"ha":case"he":case"hu":case"is":case"it":case"ku":case"lb":case"ml":case"mn":case"mr":case"nah":case"nb":case"ne":case"nl":case"nn":case"no":case"om":case"or":case"pa":case"pap":case"ps":case"pt":case"so":case"sq":case"sv":case"sw":case"ta":case"te":case"tk":case"ur":case"zu":return count==1?0:1;case"am":case"bh":case"fil":case"fr":case"gun":case"hi":case"hy":case"ln":case"mg":case"nso":case"xbr":case"ti":case"wa":return count===0||count===1?0:1;case"be":case"bs":case"hr":case"ru":case"sr":case"uk":return count%10==1&&count%100!=11?0:count%10>=2&&count%10<=4&&(count%100<10||count%100>=20)?1:2;case"cs":case"sk":return count==1?0:count>=2&&count<=4?1:2;case"ga":return count==1?0:count==2?1:2;case"lt":return count%10==1&&count%100!=11?0:count%10>=2&&(count%100<10||count%100>=20)?1:2;case"sl":return count%100==1?0:count%100==2?1:count%100==3||count%100==4?2:3;case"mk":return count%10==1?0:1;case"mt":return count==1?0:count===0||count%100>1&&count%100<11?1:count%100>10&&count%100<20?2:3;case"lv":return count===0?0:count%10==1&&count%100!=11?1:2;case"pl":return count==1?0:count%10>=2&&count%10<=4&&(count%100<12||count%100>14)?1:2;case"cy":return count==1?0:count==2?1:count==8||count==11?2:3;case"ro":return count==1?0:count===0||count%100>0&&count%100<20?1:2;case"ar":return count===0?0:count==1?1:count==2?2:count%100>=3&&count%100<=10?3:count%100>=11&&count%100<=99?4:5;default:return 0}};return Lang});

(function () {
    Lang = new Lang();
    Lang.setMessages({"en.app":{"title":"Foody"},"en.auth":{"email":"Email","failed":"These credentials do not match our records.","forgot_pass":"Forgot Password?","login":"Login","logout":"Logout","password":"Password","profile":"Profile","register":"Register","remember_me":"Remember Me","throttle":"Too many login attempts. Please try again in :seconds seconds."},"en.category":{"admin":{"add":{"create":"Create Category","name":"Name Category","parent_category":"Parent Category","placeholder_name":"Category Name","reset":"Reset","submit":"Submit","title":"Add Category"},"edit":{"title":"Edit Category"},"list":{"title":"List Categories"},"message":{"add":"Create New Category Successfull!","add_fail":"Can not add New Category. Please check connect database!","del":"Delete Category Successfull!","del_fail":"Can not Delete Category. Please check connect database!","del_no_permit":"Can not delete this Category!","edit":"Update Category Successfull!","edit_fail":"Can not edit Category by this Child!","msg_del":"Do you want to delete this Category?"},"show":{"title":"Show Category"},"table":{"action":"Action","child_category":"Child Category","delete":"Delete","edit":"Edit","id":"ID","name":"Name","parent_id":"Parent ID","show":"Show","view_children":"View sub Categories"},"title":"Category"}},"en.detail_order":{"admin":{"detail_title":"Detail Order","id":"ID","list":{"title":"List Orders"},"quantity":"Quantity","title":"Detail Order"}},"en.left-bar":{"category":"Category","create-category":"Create Category","create-order":"Create Order","create-product":"Create Product","create-store":"Create Store","create-user":"Create User","home":"Home","main":"MAIN NAVIGATION","name-project":"Admin-FOODY","order":"Order","product":"Product","show-categories":"Show all Categories","show-orders":"Show all Orders","show-products":"Show all Products","show-store":"Show all Store","show-users":"Show all users","store":"Store","user":"User","version":"1.0","version-tag":"Version:","year":"2018"},"en.messages":{"title":"Foody Dashboard","welcome":"Welcome to Foody"},"en.order":{"admin":{"active":"Active","add":{"create":"Create","enter_address":"Enter address of the Order","enter_describe":"Enter describe of the Order","enter_email":"Enter email of the Order","enter_name":"Enter name of the Order","enter_password":"Enter password of the Order","enter_phone":"Enter phone of the Order","title":"Add Order"},"address":"Address","currency":"VND","customer_note":"Customer Note","delivery_status":"Deliveried ?","delivery_time":"Delivery time","detail_title":"Detail Order","edit":{"title":"Edit Order","update":"Update"},"id":"ID","list":{"title":"List Orders"},"message":{"add":"Create New Order Successfull!","add_fail":"Can not add New Order. Please check connect database!","del":"Delete Order Successfull!","del_fail":"Can not Delete Order. Please check connect database!","delivery_status":{"no":"Not Yet","yes":"Done"},"edit":"Update Order Successfull!","edit_fail":"Can not edit Order by this Child!","msg_del":"Do you want to delete this Order?","paid":{"no":"Not Yet","yes":"Paid"},"payment_status":{"approved":"Approved","cancel":"Cancel","pending":"Pending"}},"money_ship":"Money Ship","payment_status":"Payment Status","processing_status":"Processing Status","show":{"list_products":"List of Products","title":"Show Detail Order","total_orders":"Total Orders"},"submit_time":"Submit time","table":{"delete":"Delete","edit":"Edit","show":"Show"},"title":"Order","total":"Total","total_products":"Total Products","username":"Username"}},"en.pagination":{"next":"Next &raquo;","previous":"&laquo; Previous"},"en.passwords":{"password":"Passwords must be at least six characters and match the confirmation.","reset":"Your password has been reset!","sent":"We have e-mailed your password reset link!","token":"This password reset token is invalid.","user":"We can't find a user with that e-mail address."},"en.product":{"admin":{"create":{"create_fail":"Create product failed!","create_product":"Save","create_success":"Create product successfully","enter_describe":"Describe something ...","enter_name":"Enter product name","enter_price":"Enter price","form_title":"Create Form","reset_product":"Reset","title":"Create Product"},"edit":{"cancel":"Cancel","form_title":"Edit Form","title":"Edit Product","update_fail":"Update product failed!","update_product":"Save","update_success":"Update product successfully"},"show":{"category":"Category","create_product":"Create Product","delete":"Delete","delete_confirm":"Are you sure want to delete?","delete_fail":"Delete product failed!","delete_success":"Delete product successfully","describe":"Describe","details":"Show Details","details_product":"Details Product","edit":"Edit","form_title":"List Products","image":"Image","images":"Images","name":"Name","price":"Price","store":"Store","title":"Show Products"}}},"en.store":{"admin":{"active":"Active","add":{"create":"Create","enter_address":"Enter address of the store","enter_describe":"Enter describe of the store","enter_email":"Enter email of the store","enter_name":"Enter name of the store","enter_password":"Enter password of the store","enter_phone":"Enter phone of the store","time_close":"Time Close","time_open":"Time Open","title":"Add Store"},"address":"Address","describe":"Describe","detail_title":"Detail Store","edit":{"time_close":"Time Close","time_open":"Time Open","title":"Edit Store","update":"Update"},"id":"ID","image":"Image","list":{"title":"List Stores"},"message":{"add":"Create New Store Successfull!","add_fail":"Can not add New Store. Please check connect database!","del":"Delete Store Successfull!","del_fail":"Can not Delete Store. Please check connect database!","edit":"Update Store Successfull!","edit_fail":"Can not edit Store by this Child!","msg_del":"Do you want to delete this Store?"},"name":"Name","phone":"Phone","show":{"title":"Show Store"},"table":{"delete":"Delete","edit":"Edit","show":"Show"},"title":"Store","uptime":"Uptime"}},"en.user":{"admin":{"active":"Active","actived":"Yes","birthday":"Birthday","create":{"create_success":"Create user successfully","create_user":"Save","enter_birthday":"Enter your birthday","enter_email":"Enter your email","enter_fullname":"Enter your full name","enter_password":"Enter your password","enter_phone":"Enter your phone number","enter_username":"Enter your user name","form_title":"Create Form","reset_user":"Reset","title":"Create User"},"deactived":"No","delete_fail":"Delete user failed!","delete_success":"Delete user successfully","edit":{"form_title":"Edit Form","title":"Edit User","update_fail":"Update user failed!","update_success":"Update user successfully","update_user":"Save"},"email":"Email","female":"Female","fullname":"Full Name","gender":"Gender","male":"Male","password":"Password","phone":"Phone","role":"Role","show":{"create_user":"Create User","delete":"Delete","delete_confirm":"Are you sure want to delete?","edit":"Edit","form_title":"List Users","role_admin":"Admin","role_shop_manager":"Shop Manager","role_user":"User","title":"Show User"},"username":"User Name"}},"en.user.cart":{"address_orderer":"Address 's Orderer","address_required":"Please enter the address of Orderer","buy_more":"Buy more","cancel_order":"Cancel order","cart_infor":"Cart information","delivery_date":"Delivery Date","email_orderer":"Email 's Orderer","email_regex_orderer":"Email is not format correct","email_required":"Please enter the email of Orderer","empty_cart":"Oh, your cart is empty","message_empty_cart":"Your cart is empty.","message_fail":"There was an error, please try again. Thank you","message_susscess":"Your order has been successfully submitted. The order will be delivered on time. Thank you very much.","money_ship":"Money ship","name_orderer":"Name 's Orderer","name_required":"Please enter the name of Orderer","note_orderer":"Note 's Orderer","note_required":"Please enter the note of Orderer","order_infor":"Ordering information","payments":"Payments","phone_orderer":"Phone number 's Orderer","phone_regex_orderer":"Phone number is not format correct","phone_required":"Please enter the phone number of Orderer","required_fill":"Please fill in the required information","submit":"Submit","thank_you":"Thank You! Have a good day!","title":"Checkout","total_payment":"Total payment","vnd":"VND"},"en.user.category":{"title":"Category"},"en.user.index":{"address":"Asiantech ,Dn","buy_now":"Buy Now","cart":{"cancel":"Cancel","exit":"Exit","order":"Order","title":"Cart","total":"Total","your_cart":"Your Cart"},"connect":"Connect with Foody","contact_infor":"Contact Info","copy_right":"Copyright \u00a9 2018 foody.test. All rights reserved.","delivery_area":"Delivery area","domain":"foody.test","email":"Email","email_acc":"vy.le@asiantech.vn","facebook":"Facebook","facebook_acc":"https:\/\/www.facebook.com\/vy.leba","free_delivery":"Order from 1000k - Free delivery","hot_new":"Hot New","hotline":"Hotline","hotline_phone":"0165.263.8375","location":"Location:","login":"Login","newest":"Newest Foods & Drinks","please_call":"Please call: 0165.263.8375","privacy_policy":"Privacy Policy","register":"Register","search":"Search keywords","see_more":"See more","share":"Share","sologan":"Foody - Best Foods & Drinks","title":"Foody","website":"Website"},"en.user.login":{"cart":"Cart","forgot_password":"Forgot password","login_fb":"login facabook","login_plus":"login g plus","login_success":"You have login successfully!","logout":"Logout","placeholder_password":"Password","placeholder_username":"UserName","register":"Register","remember_me":"Remember me","require":"Please fill in all information","title":"Login","userInfo":{"cancel":"Cancel","email":"Email","email_regex":"Email is not format correct","email_require":"Please input email","female":"Female","full-name-length":"Length 1-100","full_name":"FullName","full_name_require":"Please input user name","gender":"Gender","gender_require":"Please choose gender","male":"Male","messsage":"Please fill in all information","messsage_request_login":"Please login before checkouting your cart","new_password":"NewPassword","not_login":"You are not sign in or do not have account. Please sign in or sign up account!","password":"Password","password_length":"Length 8-50","password_require":"Please input password","phone":"Phone number","phone_length":"Length 1-20","phone_regex":"Phone number is not format correct","save":"Save","update_success":"Your profile was updated successfully!","username":"User Name","username_regex":"User name must be character or number","username_require":"Please input user name"}},"en.user.product":{"VAT":"Price includes 10% VAT","buy_now":"Buy Now","choose":"Choose kind:","currency":"VND","detail":"Detail","domain":"Food.test","line_1":"Extremely attractive, as well as delicious!","line_2":"Fast delivery, from 60 to 90 minutes.","line_3":"Please order before 16h (after 16h00 may be out of stock)","line_4":"Please call: 0165.263.8375","newest_products":"Newest Foods & Drinks","number_orders":"orders","quantity":"Quantity","title":"Product","views":"views"},"en.user.register":{"email":{"placeholder":"Email","regex-msg":"Email is not formatted correctly","require-msg":"The Email field is required."},"fill_all":"Please complete all information","full_name":{"length":"Length 8-50","placeholder":"Fullname","require-msg":"The Fullname field is required."},"gender":{"female":"Female","male":"Male","require-msg":"The Gender field is required."},"password":{"length":"Length 8-50","placeholder":"Password","require-msg":"The password field is required."},"phone":{"length":"Length 1-20","placeholder":"Phone","regex-msg":"Phone number is not formatted correctly","require-msg":"The Phone field is required."},"title":"Register","username":{"length":"Length 1-50","placeholder":"Username","regex-msg":"Username must be string or integer","require-msg":"The username field is required."}},"en.validation":{"accepted":"The :attribute must be accepted.","active_url":"The :attribute is not a valid URL.","after":"The :attribute must be a date after :date.","after_or_equal":"The :attribute must be a date after or equal to :date.","alpha":"The :attribute may only contain letters.","alpha_dash":"The :attribute may only contain letters, numbers, and dashes.","alpha_num":"The :attribute may only contain letters and numbers.","array":"The :attribute must be an array.","attributes":[],"before":"The :attribute must be a date before :date.","before_or_equal":"The :attribute must be a date before or equal to :date.","between":{"array":"The :attribute must have between :min and :max items.","file":"The :attribute must be between :min and :max kilobytes.","numeric":"The :attribute must be between :min and :max.","string":"The :attribute must be between :min and :max characters."},"boolean":"The :attribute field must be true or false.","confirmed":"The :attribute confirmation does not match.","custom":{"attribute-name":{"rule-name":"custom-message"}},"date":"The :attribute is not a valid date.","date_format":"The :attribute does not match the format :format.","different":"The :attribute and :other must be different.","digits":"The :attribute must be :digits digits.","digits_between":"The :attribute must be between :min and :max digits.","dimensions":"The :attribute has invalid image dimensions.","distinct":"The :attribute field has a duplicate value.","email":"The :attribute must be a valid email address.","exists":"The selected :attribute is invalid.","file":"The :attribute must be a file.","filled":"The :attribute field must have a value.","gt":{"array":"The :attribute must have more than :value items.","file":"The :attribute must be greater than :value kilobytes.","numeric":"The :attribute must be greater than :value.","string":"The :attribute must be greater than :value characters."},"gte":{"array":"The :attribute must have :value items or more.","file":"The :attribute must be greater than or equal :value kilobytes.","numeric":"The :attribute must be greater than or equal :value.","string":"The :attribute must be greater than or equal :value characters."},"image":"The :attribute must be an image.","in":"The selected :attribute is invalid.","in_array":"The :attribute field does not exist in :other.","integer":"The :attribute must be an integer.","ip":"The :attribute must be a valid IP address.","ipv4":"The :attribute must be a valid IPv4 address.","ipv6":"The :attribute must be a valid IPv6 address.","json":"The :attribute must be a valid JSON string.","lt":{"array":"The :attribute must have less than :value items.","file":"The :attribute must be less than :value kilobytes.","numeric":"The :attribute must be less than :value.","string":"The :attribute must be less than :value characters."},"lte":{"array":"The :attribute must not have more than :value items.","file":"The :attribute must be less than or equal :value kilobytes.","numeric":"The :attribute must be less than or equal :value.","string":"The :attribute must be less than or equal :value characters."},"max":{"array":"The :attribute may not have more than :max items.","file":"The :attribute may not be greater than :max kilobytes.","numeric":"The :attribute may not be greater than :max.","string":"The :attribute may not be greater than :max characters."},"mimes":"The :attribute must be a file of type: :values.","mimetypes":"The :attribute must be a file of type: :values.","min":{"array":"The :attribute must have at least :min items.","file":"The :attribute must be at least :min kilobytes.","numeric":"The :attribute must be at least :min.","string":"The :attribute must be at least :min characters."},"not_in":"The selected :attribute is invalid.","not_regex":"The :attribute format is invalid.","numeric":"The :attribute must be a number.","present":"The :attribute field must be present.","regex":"The :attribute format is invalid.","required":"The :attribute field is required.","required_if":"The :attribute field is required when :other is :value.","required_unless":"The :attribute field is required unless :other is in :values.","required_with":"The :attribute field is required when :values is present.","required_with_all":"The :attribute field is required when :values is present.","required_without":"The :attribute field is required when :values is not present.","required_without_all":"The :attribute field is required when none of :values are present.","same":"The :attribute and :other must match.","size":{"array":"The :attribute must contain :size items.","file":"The :attribute must be :size kilobytes.","numeric":"The :attribute must be :size.","string":"The :attribute must be :size characters."},"string":"The :attribute must be a string.","timezone":"The :attribute must be a valid zone.","unique":"The :attribute has already been taken.","uploaded":"The :attribute failed to upload.","url":"The :attribute format is invalid."}});
})();
