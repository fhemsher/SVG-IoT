//----mouse down---
var DraggingObjElectronic = false
var objTransformRequestObjElectronic
var objTransListElectronic
var objDragTargetElectronic = null;
var ObjStartXElectronic
var ObjStartYElectronic
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragElectronic(evt)
{
              //----drag component 
    if((!DraggingObjElectronic &&editElemElectronicViz==true)||LoadedElectronicArray.length>0) //---prevents dragging conflicts on other draggable elements---
    {

        if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
            objDragTargetElectronic = evt.target.parentNode

         if(objDragTargetElectronic)
        {
            addNoSelectAtText()
            //---used for align of projection/zoom on end drag---
            ActiveElemStartTrans =[SVGx, SVGy]

            var pnt = objDragTargetElectronic.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTargetElectronic.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObjElectronic = objDragTargetElectronic.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTargetElectronic.transform
            objTransListElectronic = myTransListAnim.baseVal

            ObjStartXElectronic = Pnt.x
            ObjStartYElectronic = Pnt.y

            DraggingObjElectronic = true

        }
    }
    else
        DraggingObjElectronic = false

}
//---mouse move---
function dragElectronic(evt)
{
    if(DraggingObjElectronic)
    {

        var pnt = objDragTargetElectronic.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTargetElectronic.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartXElectronic;
        Pnt.y -= ObjStartYElectronic;

        objTransformRequestObjElectronic.setTranslate(Pnt.x, Pnt.y)
        objTransListElectronic.appendItem(objTransformRequestObjElectronic)
        objTransListElectronic.consolidate()



    }
}
//--mouse up---
function endDragElectronic(evt)
{
    if(DraggingObjElectronic)
    {

        DraggingObjElectronic = false;

        objDragTargetElectronic = null
        DraggingObjElectronic = false

        removeNoSelectAtText()

    }
}
