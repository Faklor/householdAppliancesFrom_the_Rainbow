<template>

<svg class="animHome" width="719" height="785" viewBox="0 0 719 785" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="325.819" y="237.673" width="4" height="115.145" transform="rotate(27.2041 325.819 237.673)" fill="white" stroke="black"/>
<rect x="329.244" y="239.124" width="4" height="59.5438" transform="rotate(117.406 329.244 239.124)" fill="white" stroke="black"/>
<rect x="213.5" y="193.5" width="41" height="7" fill="white" stroke="black"/>
<path d="M176.386 253.231L155.296 217.796L196.245 212.935L176.386 253.231Z" fill="white" stroke="black"/>
<rect x="673.5" y="0.5" width="45" height="784" fill="white" stroke="black"/>
<rect x="338.5" y="366.5" width="20" height="418" fill="white" stroke="black"/>
<rect x="357.5" y="0.5" width="315" height="784" fill="white" stroke="black"/>
<rect x="176.5" y="199.5" width="100" height="166" fill="white" stroke="black"/>
<rect x="0.5" y="366.5" width="337" height="418" fill="white" stroke="black"/>
<rect x="19.5" y="381.5" width="106" height="24" fill="white" stroke="black"/>
<circle cx="175.5" cy="604.5" r="111" fill="white" stroke="black"/>
<circle cx="176" cy="604" r="97.5" fill="white" stroke="black"/>
<circle cx="274" cy="393" r="12.5" fill="white" stroke="black"/>
<circle cx="242" cy="394" r="12.5" fill="white" stroke="black"/>
<circle cx="306" cy="393" r="12.5" fill="white" stroke="black"/>
<line x1="359" y1="474.5" x2="673" y2="474.5" stroke="black"/>
</svg>

</template>

<script>
export default {
    name:'animHome',
}
</script>

<style lang="scss">
.animHome{
    animation:tit_stroke  2s infinite alternate;
    stroke:#fff;
    rect{
        fill:transparent;
	    	

    }
    circle{
        fill:transparent;
    }
    path{
        fill:transparent;
    }
}

@keyframes tit_stroke{
	0%{
		stroke-dasharray:10px;
	}
	100%{
		stroke-dasharray:12px;	
		opacity: 100%;
    //fill:#fff;
	}
}
</style>