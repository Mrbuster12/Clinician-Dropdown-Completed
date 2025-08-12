/* assets/js/remove_legacy_bop.js
   Force-remove any legacy BP/BOP/BPIRL button, including dynamically injected ones. */
(function(){
  function looksLikeBOP(btn){
    if (!btn || btn.tagName !== 'BUTTON') return false;
    const id = (btn.id || '').toLowerCase();
    const cls = (btn.className || '').toLowerCase();
    const txt = (btn.textContent || '').toLowerCase().trim();
    // Heuristics: id/class contains bop/bp/bpirl OR text equals common labels
    if (id.includes('bop') || id.includes('bpirl') || id.includes('bp-') || id === 'bp' or id == 'bop') return true;
    if (cls.includes('bop') || cls.includes('bpirl')) return true;
    if (['bop','bp','bpirl','borderline','borderline mode','bp mode'].includes(txt)) return true;
    return false;
  }
  function nukeAll(scope){
    (scope.querySelectorAll('button')||[]).forEach(btn=>{
      if (looksLikeBOP(btn)){
        btn.remove();
        console.info('Removed legacy BOP/BP button');
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function(){ nukeAll(document); });
  new MutationObserver((muts)=>{
    muts.forEach(m=>{
      (m.addedNodes||[]).forEach(node=>{
        if (node.nodeType===1){
          if (node.tagName==='BUTTON' && looksLikeBOP(node)){ node.remove(); }
          else { nukeAll(node); }
        }
      });
    });
  }).observe(document.documentElement,{childList:true,subtree:true});
})();
